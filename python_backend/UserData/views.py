from datetime import datetime, time, timedelta
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import *
from .permissions import IsSuperUser  # Import the custom permission class
from .functions import *


class DeleteUserView(APIView):
    permission_classes = [IsSuperUser]

    def delete(self, request, *args, **kwargs):
        enrollment_number = request.data.get('enrollment_number')

        if not enrollment_number:
            return Response({"error": "Enrollment number is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            student = Student.objects.get(enrollment_number=enrollment_number)
            user = student.user
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SignupStudentView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        user_type = request.data.get('user_type')
        user_data = request.data.get('user', {})
        enrollment_number = request.get('enrollment_number')

        if not enrollment_number:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                username=enrollment_number,
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                email=user_data.get('email'),
                password=user_data.get('password')
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        if user_type == 'student':
            roll_number = request.data.get('roll_number')
            branch = request.data.get('branch')

            if not roll_number:
                return Response({"error": "Roll number is required"}, status=status.HTTP_400_BAD_REQUEST)
            if not enrollment_number:
                return Response({"error": "Enrollment number is required"}, status=status.HTTP_400_BAD_REQUEST)
            if not branch:
                return Response({"error": "Branch is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                student = Student.objects.create(
                    user=user,
                    roll_number=roll_number,
                    enrollment_number=enrollment_number,
                    branch=branch
                )
            except Exception as e:
                user.delete()
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            response_data = {
                'id': student.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'roll_number': student.roll_number,
                'enrollment_number': student.enrollment_number,
                'branch': student.branch
            }
        else:
            user.delete()
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate and log in the user
        user = authenticate(request, username=enrollment_number,
                            password=user_data.get('password'))
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            response_data['token'] = token.key
            response_data['user_role'] = 'student'

        return Response(response_data, status=status.HTTP_201_CREATED)


class SignUpFacultyView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request):
        user_data = request.data.get('user', {})
        username = user_data.get('username')

        if not username:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(
                username=username,
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                email=user_data.get('email'),
                password=user_data.get('password')
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        subject = request.data.get('subject')
        hire_date = request.data.get('hire_date')
        department = request.data.get('department')

        if not subject:
            return Response({"error": "Subject is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not hire_date:
            return Response({"error": "Date of birth is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not department:
            return Response({"error": "Department is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            faculty = Faculty.objects.create(
                user=user,
                subject=subject,
                hire_date=hire_date,
                department=department
            )
        except Exception as e:
            user.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'id': faculty.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'subject': faculty.subject,
            'hire_date': faculty.hire_date,
            'department': faculty.department,
            'user_role': 'faculty'
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        enrollment_number = request.data.get('enrollmentNumber')
        password = request.data.get('password')
        user = authenticate(
            request, username=enrollment_number, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            userRole = CheckForUserRole(user)
            return Response({'token': token.key, 'user_role': userRole}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=status.HTTP_200_OK)


class AddTimetableView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        try:
            faculty = Faculty.objects.get(user=user)
        except Faculty.DoesNotExist:
            return Response({"error": "Faculty not found"}, status=status.HTTP_404_NOT_FOUND)

        date_str = request.data.get('date')
        start_time_str = request.data.get('start_time')
        end_time_str = request.data.get('end_time')
        batch = request.data.get('batch')

        if not date_str or not start_time_str or not end_time_str or not batch:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            date = datetime.strptime(date_str, '%Y-%m-%d').date()
            start_time = datetime.strptime(start_time_str, '%H:%M').time()
            end_time = datetime.strptime(end_time_str, '%H:%M').time()
        except ValueError:
            return Response({"error": "Invalid date or time format."}, status=status.HTTP_400_BAD_REQUEST)

        start_datetime = datetime.combine(date, start_time)
        end_datetime = datetime.combine(date, end_time)

        if end_datetime <= start_datetime:
            return Response({"error": "End time must be after start time."}, status=status.HTTP_400_BAD_REQUEST)

        total_hours = (end_datetime - start_datetime).total_seconds() / 3600
        total_hours = round(total_hours, 2)

        # Check for time clashes for the same faculty
        faculty_clashes = Timetable.objects.filter(
            faculty=faculty,
            date=date,
            start_time__lt=end_time,
            end_time__gt=start_time
        )

        if faculty_clashes.exists():
            return Response({"error": "Timetable clashes with an existing timetable for the same faculty."}, status=status.HTTP_400_BAD_REQUEST)

        # Check for time clashes for the same batch
        batch_clashes = Timetable.objects.filter(
            batch=batch,
            date=date,
            start_time__lt=end_time,
            end_time__gt=start_time
        )

        if batch_clashes.exists():
            return Response({"error": "Timetable clashes with an existing timetable for the same batch."}, status=status.HTTP_400_BAD_REQUEST)

        timetable_data = {
            'faculty': faculty,
            'date': date,
            'start_time': start_time,
            'end_time': end_time,
            'total_hours': total_hours,
            'batch': batch,
            'subject': faculty.subject,
        }

        try:
            timetable = Timetable.objects.create(**timetable_data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"message": "Timetable added successfully"}, status=status.HTTP_201_CREATED)


class DeleteTimetableView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            timetable = Timetable.objects.get(pk=pk)
            timetable.delete()
            return Response({"message": "Timetable deleted successfully"}, status=status.HTTP_200_OK)
        except Timetable.DoesNotExist:
            return Response({"error": "Timetable not found"}, status=status.HTTP_404_NOT_FOUND)


class UserBatchTimetableView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            timetables = Timetable.objects.filter(batch=student.batch)
        except Timetable.DoesNotExist:
            return Response({"error": "No timetables found for the student's batch"}, status=status.HTTP_404_NOT_FOUND)

        response_data = [
            {
                'faculty': {
                    'username': timetable.faculty.user.username,
                    'first_name': timetable.faculty.user.first_name,
                    'last_name': timetable.faculty.user.last_name,
                    'subject': timetable.faculty.subject,
                },
                'date': timetable.date,
                'start_time': timetable.start_time.strftime('%H:%M') if timetable.start_time else 'N/A',
                'end_time': timetable.end_time.strftime('%H:%M') if timetable.end_time else 'N/A',
                'total_hours': timetable.total_hours,
                'batch': timetable.batch,
                'subject': timetable.subject,
                'day': timetable.day_of_week
            }
            for timetable in timetables
        ]
        return Response(response_data, status=status.HTTP_200_OK)


class BatchTimetableView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, batch):
        timetables = Timetable.objects.filter(batch=batch)
        response_data = [
            {
                'id': timetable.id,
                'faculty': {
                    'id': timetable.faculty.id,
                    'username': timetable.faculty.user.username,
                    'first_name': timetable.faculty.user.first_name,
                    'last_name': timetable.faculty.user.last_name,
                    'email': timetable.faculty.user.email,
                    'subject': timetable.faculty.subject,
                    'hire_date': timetable.faculty.hire_date,
                    'department': timetable.faculty.department
                },
                'start_time': timetable.start_time.strftime('%H:%M') if timetable.start_time else 'N/A',
                'end_time': timetable.end_time.strftime('%H:%M') if timetable.end_time else 'N/A',
                'total_hours': timetable.total_hours,
                'batch': timetable.batch,
                'subject': timetable.subject,
                'day_of_week': timetable.day_of_week
            }
            for timetable in timetables
        ]
        return Response(response_data, status=status.HTTP_200_OK)


class TimetableListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        timetables = Timetable.objects.all()
        response_data = [
            {
                'id': timetable.id,
                'faculty': {
                    'id': timetable.faculty.id,
                    'username': timetable.faculty.user.username,
                    'first_name': timetable.faculty.user.first_name,
                    'last_name': timetable.faculty.user.last_name,
                    'email': timetable.faculty.user.email,
                    'subject': timetable.faculty.subject,
                    'hire_date': timetable.faculty.hire_date,
                    'department': timetable.faculty.department
                },
                'start_time': timetable.start_time.strftime('%H:%M') if timetable.start_time else 'N/A',
                'end_time': timetable.end_time.strftime('%H:%M') if timetable.end_time else 'N/A',
                'total_hours': timetable.total_hours,
                'batch': timetable.batch,
                'subject': timetable.subject,
                'day_of_week': timetable.day_of_week
            }
            for timetable in timetables
        ]
        return Response(response_data, status=status.HTTP_200_OK)


class TimetableDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Timetable.objects.get(pk=pk)
        except Timetable.DoesNotExist:
            return None

    def put(self, request, pk, format=None):
        timetable = self.get_object(pk)
        if timetable is None:
            return Response({'error': 'Timetable not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            data = request.data
            new_date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()
            new_start_time = datetime.strptime(
                data.get('start_time'), '%H:%M').time()
            new_end_time = datetime.strptime(
                data.get('end_time'), '%H:%M').time()
            new_batch = data.get('batch', timetable.batch)
            new_faculty = data.get('faculty', timetable.faculty)

            # Check if end time is earlier than start time
            if new_end_time <= new_start_time:
                return Response({'error': 'End time must be later than start time'}, status=status.HTTP_400_BAD_REQUEST)

            start_datetime = datetime.combine(new_date, new_start_time)
            end_datetime = datetime.combine(new_date, new_end_time)

            # Check for scheduling conflicts for the same faculty
            faculty_conflicts = Timetable.objects.filter(
                faculty=new_faculty,
                date=new_date
            ).exclude(pk=pk).filter(
                start_time__lt=new_end_time,
                end_time__gt=new_start_time
            )

            if faculty_conflicts.exists():
                return Response({'error': 'Scheduling conflict for the same faculty'}, status=status.HTTP_400_BAD_REQUEST)

            # Check for scheduling conflicts for the same batch
            batch_conflicts = Timetable.objects.filter(
                batch=new_batch,
                date=new_date
            ).exclude(pk=pk).filter(
                start_time__lt=new_end_time,
                end_time__gt=new_start_time
            )

            if batch_conflicts.exists():
                return Response({'error': 'Scheduling conflict for the same batch'}, status=status.HTTP_400_BAD_REQUEST)

            # Calculate the difference
            total_hours = (
                end_datetime - start_datetime).total_seconds() / 3600
            total_hours = round(total_hours, 2)

            timetable.date = new_date
            timetable.start_time = new_start_time
            timetable.end_time = new_end_time
            timetable.total_hours = total_hours
            timetable.batch = new_batch
            timetable.subject = data.get('subject', timetable.subject)
            timetable.save()

            return Response({
                'id': timetable.id,
                'faculty': {
                    'id': timetable.faculty.id,
                    'username': timetable.faculty.user.username,
                    'first_name': timetable.faculty.user.first_name,
                    'last_name': timetable.faculty.user.last_name,
                    'email': timetable.faculty.user.email,
                    'department': timetable.faculty.department,
                },
                'date': timetable.date.strftime('%Y-%m-%d'),
                'start_time': timetable.start_time.strftime('%H:%M') if timetable.start_time else 'N/A',
                'end_time': timetable.end_time.strftime('%H:%M') if timetable.end_time else 'N/A',
                'total_hours': timetable.total_hours,
                'batch': timetable.batch,
                'subject': timetable.subject,
                'day_of_week': timetable.day_of_week,  # Computed dynamically
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        timetable = self.get_object(pk)
        if timetable is None:
            return Response({'error': 'Timetable not found'}, status=status.HTTP_404_NOT_FOUND)

        timetable.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FacultyTimetableView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            timetables = Timetable.objects.filter(faculty__user=user)
            timetable_list = []
            for timetable in timetables:
                timetable_list.append({
                    'id': timetable.id,
                    'batch': timetable.batch,
                    'subject': timetable.subject,
                    'day_of_week': timetable.day_of_week,
                    'start_time': timetable.start_time.strftime('%H:%M') if timetable.start_time else 'N/A',
                    'end_time': timetable.end_time.strftime('%H:%M') if timetable.end_time else 'N/A',
                    'total_hours': timetable.total_hours,
                })
            return Response(timetable_list, status=status.HTTP_200_OK)
        except Timetable.DoesNotExist:
            return Response({"error": "Timetable not found."}, status=status.HTTP_404_NOT_FOUND)


class AdminTimetableView(APIView):
    permission_classes = [IsSuperUser]

    def get(self, request):
        timetables = Timetable.objects.all()

        def format_time(time):
            if time is None:
                return "N/A"
            return time.strftime('%I:%M %p')

        response_data = [
            {
                'id': timetable.id,
                'faculty': {
                    'id': timetable.faculty.id,
                    'username': timetable.faculty.user.username,
                    'first_name': timetable.faculty.user.first_name,
                    'last_name': timetable.faculty.user.last_name,
                    'email': timetable.faculty.user.email,
                    'subject': timetable.faculty.subject,
                    'hire_date': timetable.faculty.hire_date,
                    'department': timetable.faculty.department
                },
                'date': timetable.date.strftime('%Y-%m-%d'),
                'start_time': format_time(timetable.start_time),
                'end_time': format_time(timetable.end_time),
                'total_hours': timetable.total_hours,
                'batch': timetable.batch,
                'subject': timetable.subject,
                'day_of_week': timetable.day_of_week
            }
            for timetable in timetables
        ]
        return Response(response_data, status=status.HTTP_200_OK)


class SendNotificationView(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request, *args, **kwargs):
        recipient_type = request.data.get('recipient_type')
        subject = request.data.get('subject')
        message = request.data.get('message')

        if not recipient_type or not subject or not message:
            return Response({"error": "Recipient type, subject, and message are required."}, status=status.HTTP_400_BAD_REQUEST)

        if recipient_type == 'students':
            users = User.objects.filter(student__isnull=False)
        elif recipient_type == 'faculty':
            users = User.objects.filter(faculty__isnull=False)
        elif recipient_type == 'both':
            users = User.objects.filter(
                student__isnull=False) | User.objects.filter(faculty__isnull=False)
        else:
            return Response({"error": "Invalid recipient type."}, status=status.HTTP_400_BAD_REQUEST)

        notifications = []
        for user in users:
            notification = Notification(
                user=user, subject=subject, message=message)
            notifications.append(notification)
        notification = Notification(
            user=request.user, subject=subject, message=message)
        notifications.append(notification)

        Notification.objects.bulk_create(notifications)

        return Response({"message": "Notifications sent successfully."}, status=status.HTTP_201_CREATED)


class UserNotificationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        notifications = Notification.objects.filter(
            user=request.user).order_by('-created_at')
        notifications_data = [
            {
                "id": notification.id,
                "subject": notification.subject,
                "message": notification.message,
                "created_at": notification.created_at,
            }
            for notification in notifications
        ]
        return Response(notifications_data, status=status.HTTP_200_OK)
