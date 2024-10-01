from django.db import models
from django.contrib.auth.models import User
from UserData.models import Student, Faculty


class Exam(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_by = models.ForeignKey(
        Faculty, on_delete=models.CASCADE, related_name='created_exams')
    created_at = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    department = models.CharField(max_length=100)  # New field

    def __str__(self):
        return self.title


class QuestionAnswerPair(models.Model):
    exam = models.ForeignKey(
        Exam, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    correct_answer = models.TextField()

    def __str__(self):
        return self.question


class StudentAnswer(models.Model):
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(
        QuestionAnswerPair, on_delete=models.CASCADE, related_name='student_answers')
    answer = models.TextField()
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.user.username} - {self.question.question}"
