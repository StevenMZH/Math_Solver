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
    content = models.CharField(max_length=500)  # Ajustar según la necesidad
    operation = models.CharField(max_length=255)
    time = models.DateTimeField(auto_now_add=True)

# API_Response Model
class API_Response(models.Model):
    type = models.CharField(max_length=255)
    request = models.ForeignKey(API_Request, on_delete=models.SET_NULL, null=True, blank=True)  # Ajustado
    content = models.CharField(max_length=500)  # Agregado max_length
    time = models.DateTimeField(auto_now_add=True)
