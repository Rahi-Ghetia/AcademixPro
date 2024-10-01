import pytz
from django.utils import timezone
from datetime import datetime
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from UserData.models import Faculty, Student
from django.contrib.auth.models import User
from UserData.permissions import IsSuperUser


class CreateExamView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            return Response({"error": "Faculty not found"}, status=status.HTTP_404_NOT_FOUND)

        title = request.data.get('title')
        description = request.data.get('description')
        start_time_str = request.data.get('start_time')
        end_time_str = request.data.get('end_time')
        department = request.data.get('department')
        questions = request.data.get('questions')

        # Validate required fields
        if not title or not description or not start_time_str or not end_time_str or not department or not questions:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Convert start_time and end_time to datetime objects with timezone information
        try:
            start_time = datetime.fromisoformat(
                start_time_str).astimezone(pytz.UTC)
            end_time = datetime.fromisoformat(
                end_time_str).astimezone(pytz.UTC)
        except ValueError:
            return Response({"error": "Invalid date format. Use ISO 8601 format."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure end_time is after start_time
        if end_time <= start_time:
            return Response({"error": "End time must be after start time."}, status=status.HTTP_400_BAD_REQUEST)

        # Check for time clashes with existing exams
        existing_exams = Exam.objects.filter(created_by=faculty)
        for exam in existing_exams:
            if (start_time < exam.end_time and end_time > exam.start_time):
                return Response({"error": "Exam time clashes with an existing exam."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the exam
        exam = Exam.objects.create(
            title=title,
            description=description,
            created_by=faculty,
            start_time=start_time,
            end_time=end_time,
            department=department
        )

        # Create questions for the exam
        for q in questions:
            QuestionAnswerPair.objects.create(
                exam=exam,
                question=q['question'],
                correct_answer=q['correct_answer']
            )

        return Response({"message": "Exam created successfully."}, status=status.HTTP_201_CREATED)


class ListExamsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        current_time = timezone.now()
        # Get exams that the student has not submitted answers for
        submitted_exam_ids = StudentAnswer.objects.filter(
            student=student).values_list('question__exam_id', flat=True)
        exams = Exam.objects.filter(end_time__gte=current_time, department=student.branch
                                    ).exclude(id__in=submitted_exam_ids).order_by('-created_at')

        exams_data = [
            {
                "id": exam.id,
                "title": exam.title,
                "description": exam.description,
                "created_by": exam.created_by.user.username,
                "created_at": exam.created_at,
                "start_time": exam.start_time,
                "end_time": exam.end_time,
            }
            for exam in exams
        ]
        return Response(exams_data, status=status.HTTP_200_OK)


class SubmitAnswersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        answers = request.data.get('answers')

        if not answers:
            return Response({"error": "Answers are required."}, status=status.HTTP_400_BAD_REQUEST)

        results = []

        for answer_data in answers:
            question_id = answer_data.get('question_id')
            answer = answer_data.get('answer')

            if not question_id or not answer:
                return Response({"error": "Question ID and answer are required for each answer."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                question = QuestionAnswerPair.objects.get(id=question_id)
            except QuestionAnswerPair.DoesNotExist:
                return Response({"error": f"Question with ID {question_id} not found."}, status=status.HTTP_404_NOT_FOUND)

            exam = question.exam
            current_time = timezone.now()

            if current_time < exam.start_time:
                return Response({"error": "Cannot submit answers before the exam start time."}, status=status.HTTP_400_BAD_REQUEST)

            if current_time > exam.end_time:
                return Response({"error": "Cannot submit answers after the exam end time."}, status=status.HTTP_400_BAD_REQUEST)

            is_correct = (answer.strip().lower() ==
                          question.correct_answer.strip().lower())

            StudentAnswer.objects.create(
                student=student,
                question=question,
                answer=answer,
                is_correct=is_correct
            )

            results.append({
                "question_id": question_id,
                "is_correct": is_correct
            })

        return Response({"message": "Answers submitted successfully.", "results": results}, status=status.HTTP_201_CREATED)


class ExamDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, exam_id, *args, **kwargs):
        user = request.user
        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            exam = Exam.objects.get(id=exam_id)
        except Exam.DoesNotExist:
            return Response({"error": "Exam not found"}, status=status.HTTP_404_NOT_FOUND)

        current_time = timezone.now()
        if current_time < exam.start_time:
            return Response({"error": "Exam details cannot be accessed before the start time."}, status=status.HTTP_403_FORBIDDEN)

        # Check if the student has already submitted the exam
        if StudentAnswer.objects.filter(student=student, question__exam=exam).exists():
            return Response({"error": "You have already submitted this exam."}, status=status.HTTP_403_FORBIDDEN)

        # Check if the student's department matches the exam's department
        if student.branch != exam.department:
            return Response({"error": "You do not have access to this exam."}, status=status.HTTP_403_FORBIDDEN)

        questions = QuestionAnswerPair.objects.filter(exam=exam)
        questions_data = [
            {
                "id": question.id,
                "question": question.question,
                # You might want to exclude this in a real exam scenario
                # "correct_answer": question.correct_answer,
            }
            for question in questions
        ]

        exam_data = {
            "id": exam.id,
            "title": exam.title,
            "description": exam.description,
            "start_time": exam.start_time,
            "end_time": exam.end_time,
            "questions": questions_data,
        }

        return Response(exam_data, status=status.HTTP_200_OK)


class UpdateExamView(APIView):
    permission_classes = [IsSuperUser]

    def put(self, request, *args, **kwargs):
        user = request.user
        exam_id = kwargs.get('exam_id')
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            return Response({"error": "Faculty not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            exam = Exam.objects.get(id=exam_id, created_by=faculty)
        except Exam.DoesNotExist:
            return Response({"error": "Exam not found"}, status=status.HTTP_404_NOT_FOUND)

        title = request.data.get('title')
        description = request.data.get('description')
        start_time_str = request.data.get('start_time')
        end_time_str = request.data.get('end_time')
        department = request.data.get('department')
        questions = request.data.get('questions')

        # Validate required fields
        if not title or not description or not start_time_str or not end_time_str or not department or not questions:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Convert start_time and end_time to datetime objects with timezone information
        try:
            start_time = datetime.fromisoformat(
                start_time_str).astimezone(pytz.UTC)
            end_time = datetime.fromisoformat(
                end_time_str).astimezone(pytz.UTC)
        except ValueError:
            return Response({"error": "Invalid date format. Use ISO 8601 format."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure end_time is after start_time
        if end_time <= start_time:
            return Response({"error": "End time must be after start time."}, status=status.HTTP_400_BAD_REQUEST)

        # Check for time clashes with existing exams
        existing_exams = Exam.objects.filter(
            created_by=faculty).exclude(id=exam_id)
        for existing_exam in existing_exams:
            if (start_time < existing_exam.end_time and end_time > existing_exam.start_time):
                return Response({"error": "Exam time clashes with an existing exam."}, status=status.HTTP_400_BAD_REQUEST)

        # Update the exam
        exam.title = title
        exam.description = description
        exam.start_time = start_time
        exam.end_time = end_time
        exam.department = department
        exam.save()

        # Update questions for the exam
        exam.questions.all().delete()
        for q in questions:
            QuestionAnswerPair.objects.create(
                exam=exam,
                question=q['question'],
                correct_answer=q['correct_answer']
            )

        return Response({"message": "Exam updated successfully."}, status=status.HTTP_200_OK)


class DeleteExamView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, exam_id, *args, **kwargs):
        user = request.user
        # exam_id = request.data.get('exam_id')
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            return Response({"error": "FacIsulty not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            exam = Exam.objects.get(id=exam_id, created_by=faculty)
        except Exam.DoesNotExist:
            return Response({"error": "Exam not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the exam
        exam.delete()

        return Response({"message": "Exam deleted successfully."}, status=status.HTTP_200_OK)
