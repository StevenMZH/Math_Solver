from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.timezone import now
import uuid
from datetime import timedelta

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password if password else '')  # Se establece '' si no hay contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    email = models.EmailField(unique=True, db_index=True)
    username = models.CharField(max_length=30, blank=True, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    profile_picture = models.URLField(blank=True, null=True)  # Foto como URL desde Google
    birth_date = models.DateField(blank=True, null=True)      # Campo para cumpleaños
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserMetadata(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('VIP', 'VIP'),
        ('Beta-tester', 'Beta-tester'),
        ('Teacher', 'Teacher'),
        ('Student', 'Student'),
    ]

    THEME_CHOICES = [('light', 'light'), ('dark', 'dark')]
    LANGUAGE_CHOICES = [('en', 'English'), ('es', 'Spanish')]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='metadata')

    # Metadata fields
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Student')
    total_time_spent = models.DurationField(default=timedelta(0))
    total_sessions = models.BigIntegerField(default=0)
    last_check_in = models.DateTimeField(null=True, blank=True)

    # Gamification
    daily_streak = models.BigIntegerField(default=0)
    longest_daily_streak = models.BigIntegerField(default=0)
    badges = models.JSONField(default=list, blank=True)
    points = models.BigIntegerField(default=0)
    level = models.IntegerField(default=1)

    # Courses and progress
    enrolled_courses = models.ManyToManyField('courses.Course', blank=True, related_name='enrolled_users')
    completed_courses = models.ManyToManyField('courses.Course', blank=True, related_name='completed_users')
    completed_courses_lessons = models.JSONField(default=dict, blank=True)
    completed_classes = models.ManyToManyField('courses.CourseLesson', blank=True)
    completed_exercises = models.JSONField(default=list, blank=True)
    content_history = models.JSONField(default=list, blank=True)

    # Preferences
    language = models.CharField(max_length=8, choices=LANGUAGE_CHOICES, default='en')
    theme = models.CharField(max_length=15, choices=THEME_CHOICES, default='light')
    notifications = models.BooleanField(default=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Metadata of {self.user.email}"
