from django.db import models
from django.contrib.auth.models import User


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=10, unique=True)
    enrollment_number = models.CharField(max_length=20, unique=True)
    batch = models.CharField(max_length=50)
    branch = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        # Set the username of the related User instance to the enrollment number
        self.user.username = self.enrollment_number
        self.user.save()
        super(Student, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.user.first_name} {self.user.last_name}"


class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    hire_date = models.DateField()
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.user.first_name} {self.user.last_name}"


class Timetable(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    total_hours = models.DecimalField(max_digits=4, decimal_places=2)
    batch = models.CharField(max_length=50)
    subject = models.CharField(max_length=100)
    day_of_week = models.CharField(max_length=10)

    @property
    def day_of_week(self):
        return self.date.strftime('%A')

    def __str__(self):
        return f"{self.subject} - {self.faculty.user.first_name} {self.faculty.user.last_name} ({self.day_of_week})"


class Notification(models.Model):
    subject = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='notifications')

    def __str__(self):
        return f"{self.subject} - {self.user.username}"
