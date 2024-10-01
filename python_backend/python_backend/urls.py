from django.urls import path
from django.contrib import admin
from UserData.views import *
from ExamApp.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('delete-user/', DeleteUserView.as_view(), name='delete-user'),
    path('signup-student/', SignupStudentView.as_view(), name='signup-student'),
    path('signup-faculty/', SignUpFacultyView.as_view(), name='signup-faculty'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #     path('faculty-subjects/', FacultySubjectsView.as_view(),
    #          name='faculty-subjects'),

    # TimeTables
    path('timetables/', TimetableListView.as_view(), name='timetable-list'),
    path('timetables/faculty/',
         FacultyTimetableView.as_view(), name='faculty-timetable'),
    path('timetables/batch/',
         UserBatchTimetableView.as_view(), name='batch-timetable'),
    path('timetables/add/', AddTimetableView.as_view(), name='add-timetable'),
    path('timetables/delete/<int:pk>/',
         DeleteTimetableView.as_view(), name='delete-timetable'),
    path('timetables/admin/', AdminTimetableView.as_view(), name='admin-timetable'),
    path('timetables/admin/<int:pk>/',
         TimetableDetailView.as_view(), name='timetable_detail'),

    # Notifications
    path('send-notification/', SendNotificationView.as_view(),
         name='send_notification'),
    path('notifications/', UserNotificationsView.as_view(),
         name='user_notifications'),

    # Exam
    path('create-exam/', CreateExamView.as_view(), name='create_exam'),
    path('list-exams/', ListExamsView.as_view(), name='list-exams'),
    path('exams/<int:exam_id>/', ExamDetailView.as_view(), name='exam-detail'),
    path('submit-answers/', SubmitAnswersView.as_view(), name='submit_answers'),

    path('delete-exam/<int:exam_id>/',
         DeleteExamView.as_view(), name='delete-exams'),
]
