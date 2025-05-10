from rest_framework import serializers
from .models import Course, CourseUnit, CourseLesson

class PublicLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = [
            'id',
            'name',
            'type',
            'content_data',
            'order',
        ]

class PublicUnitSerializer(serializers.ModelSerializer):
    lessons = PublicLessonSerializer(many=True, read_only=True)

    class Meta:
        model = CourseUnit
        fields = ['id', 'name', 'lessons']

class PublicCourseSerializer(serializers.ModelSerializer):
    units = PublicUnitSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'field',
            'description',
            'formulas',
            'units',
            'prerequisites',
            'recommended',
            'level'
        ]

from rest_framework import serializers
from .models import Course, CourseUnit, CourseLesson

class PrivateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class PrivateUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = '__all__'

class PrivateLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = '__all__'
