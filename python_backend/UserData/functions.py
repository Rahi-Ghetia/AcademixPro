from .models import *


def CheckForUserRole(userData):
    if userData.is_superuser:
        return 'superuser'
    elif Student.objects.filter(user=userData).exists():
        return 'student'
    elif Faculty.objects.filter(user=userData).exists():
        return 'faculty'
    else:
        return ({"error": "User role not found."})
