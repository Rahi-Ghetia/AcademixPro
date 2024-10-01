# Generated by Django 5.0.2 on 2024-09-20 10:38

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserData', '0009_student_batch'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='timetable',
            name='day_of_week',
        ),
        migrations.AddField(
            model_name='timetable',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='timetable',
            name='end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='timetable',
            name='start_time',
            field=models.TimeField(),
        ),
    ]