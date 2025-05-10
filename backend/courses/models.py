from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

# Parent Class for Content sub-classes
class AbstractContent(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.JSONField(default=dict) # {"en":"Calculo", "es": "Calculus" }
    keywords = models.JSONField(blank=True, default=list)
    indexable = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['keywords']),
        ]
        
    def __str__(self):
        return f"{self.__class__.__name__} {self.id}: {self.name}"
    
    def get_name(self, lang='en'):
        return self.name.get(lang, self.name.get('en', ''))

class Course(AbstractContent):
    field = models.CharField(max_length=100, choices=[
        ('math', 'Mathematics'),
        ('cs', 'Computer Science'),
        ('physics', 'Physics'),
        ('electronics', 'Electronics'),
    ])
    description = models.JSONField(default=dict)
    formulas = models.JSONField(blank=True, default=list)
    prerequisites = models.TextField(blank=True) #
    recommended = models.ManyToManyField(
        'self',
        symmetrical=False,
        related_name='recommended_by',
        blank=True
    ) #
    level = models.CharField(max_length=50, choices=[
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ], default='beginner')

    def __str__(self):
        return f"Course {self.id}: {self.name}"


class CourseUnit(models.Model):
    id = models.CharField(primary_key=True, max_length=64, unique=True)
    name = models.JSONField(default=dict)
    course = models.ForeignKey(Course, related_name='units', on_delete=models.CASCADE)

    def __str__(self):
        return f"Unit {self.id}: {self.name}"


class CourseLesson(AbstractContent):
    type = models.CharField(max_length=50, choices=[
        ('theory', 'Theory'),
        ('practice', 'Practice'),
        ('test', 'Test'),
    ])
    content_data = models.JSONField(blank=True, default=list)
    order = models.IntegerField()
    units = models.ManyToManyField(CourseUnit, related_name='lessons') # foreign


    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Class {self.id}: {self.name}"



# Update RT on redis, once daily on Postgre
class ContentMetrics(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    views = models.PositiveIntegerField(default=0) 
    time_spent = models.DurationField(null=True, blank=True)
    completions = models.PositiveIntegerField(default=0)
    favorites = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.CharField(max_length=64) # Same ID data type as the related content IDs
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"Content Progress of {self.account.user.username}"