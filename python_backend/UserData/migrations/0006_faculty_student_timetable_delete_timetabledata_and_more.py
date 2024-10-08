# Generated by Django 5.0.2 on 2024-09-19 12:45

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserData', '0005_timetabledata_batch'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_birth', models.DateField()),
                ('hire_date', models.DateField()),
                ('department', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roll_number', models.CharField(max_length=10, unique=True)),
                ('enrollment_number', models.CharField(max_length=20, unique=True)),
                ('branch', models.CharField(max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Timetable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('total_hours', models.DecimalField(decimal_places=2, max_digits=4)),
                ('batch', models.CharField(max_length=50)),
                ('subject', models.CharField(max_length=100)),
                ('day_of_week', models.CharField(max_length=10)),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='UserData.faculty')),
            ],
        ),
        migrations.DeleteModel(
            name='TimeTableData',
        ),
        migrations.DeleteModel(
            name='UserAccountsData',
        ),
    ]
