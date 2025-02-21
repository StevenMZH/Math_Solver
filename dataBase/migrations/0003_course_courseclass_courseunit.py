# Generated by Django 5.1.1 on 2025-01-05 22:57

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dataBase', '0002_rename_first_name_user_username_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('nameId', models.CharField(max_length=64, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('field', models.CharField(choices=[('math', 'Mathematics'), ('cs', 'Computer Science'), ('physics', 'Physics'), ('electronics', 'Electronics')], max_length=100)),
                ('description', models.CharField(max_length=255)),
                ('formulas', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='CourseClass',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('class_type', models.CharField(choices=[('theory', 'Theory'), ('practice', 'Practice'), ('test', 'Test')], max_length=50)),
                ('content', models.TextField()),
                ('order', models.IntegerField()),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='CourseUnit',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units', to='dataBase.course')),
                ('course_classes', models.ManyToManyField(related_name='units', to='dataBase.courseclass')),
            ],
        ),
    ]
