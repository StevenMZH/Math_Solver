from django.db import models
import uuid

class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    field = models.CharField(max_length=100, choices=[
        ('math', 'Mathematics'),
        ('cs', 'Computer Science'),
        ('physics', 'Physics'),
        ('electronics', 'Electronics'),
    ])
    keywords = models.JSONField(blank=True, default=list)
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


class CourseLesson(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    class_type = models.CharField(max_length=50, choices=[
        ('theory', 'Theory'),
        ('practice', 'Practice'),
        ('test', 'Test'),
    ])
    keywords = models.JSONField(blank=True, default=list)
    content = models.JSONField(blank=True, default=list)
    order = models.IntegerField()  # Este campo permitirá ordenar las clases dentro de la unidad
    units = models.ManyToManyField(CourseUnit, related_name='classes')  # Relación de muchas unidades a muchas clases

    def __str__(self):
        return f"Class {self.id}: {self.name}"

    class Meta:
        ordering = ['order']  # Ordena las clases por el campo 'order' por defecto


class Exercise(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.CharField(max_length=100)
    problemText = models.CharField(max_length=511)
    image = models.URLField(max_length=200, blank=True, null=True)
    problem = models.CharField(max_length=511)
    solution = models.CharField(max_length=255)

    def __str__(self):
        return f"ClassExercise {self.id}: {self.name}"