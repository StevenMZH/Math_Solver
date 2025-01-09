from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

# python manage.py makemigrations
# python manage.py migrate

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo electrónico debe ser proporcionado')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, db_index=True)
    username = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# API_Request Model
class API_Request(models.Model):
    type = models.CharField(max_length=255)
    content = models.CharField(max_length=500)
    operation = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

# API_Response Model
class API_Response(models.Model):
    type = models.CharField(max_length=255)
    request = models.ForeignKey(API_Request, on_delete=models.SET_NULL, null=True, blank=True)
    content = models.CharField(max_length=500)
    time = models.DateTimeField(auto_now_add=True)

from django.db import models

class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    field = models.CharField(max_length=100, choices=[
        ('math', 'Mathematics'),
        ('cs', 'Computer Science'),
        ('physics', 'Physics'),
        ('electronics', 'Electronics'),
    ])
    description = models.CharField(max_length=255)
    formulas = models.JSONField(blank=True, default=list)

    def __str__(self):
        return f"Course {self.id}: {self.name}"


class CourseUnit(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    course = models.ForeignKey(Course, related_name='units', on_delete=models.CASCADE)

    def __str__(self):
        return f"Unit {self.id}: {self.name}"


class CourseClass(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    class_type = models.CharField(max_length=50, choices=[
        ('theory', 'Theory'),
        ('practice', 'Practice'),
        ('test', 'Test'),
    ])
    content = models.TextField()  # El contenido en formato HTML puede ser almacenado como texto
    order = models.IntegerField()  # Este campo permitirá ordenar las clases dentro de la unidad
    units = models.ManyToManyField(CourseUnit, related_name='classes')  # Relación de muchas unidades a muchas clases

    def __str__(self):
        return f"Class {self.id}: {self.name}"

    class Meta:
        ordering = ['order']  # Ordena las clases por el campo 'order' por defecto
