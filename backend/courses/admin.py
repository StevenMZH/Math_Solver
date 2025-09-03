from django.contrib import admin
from .models import Course, CourseUnit, CourseLesson

admin.site.register(Course)
admin.site.register(CourseUnit)
admin.site.register(CourseLesson)