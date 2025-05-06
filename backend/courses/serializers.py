from rest_framework import serializers
from .models import Course, CourseUnit, CourseLesson, Exercise

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = ['id', 'name', 'class_type', 'keywords', 'content', 'order']

class UnitSerializer(serializers.ModelSerializer):
    classes = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseUnit
        fields = ['id', 'name', 'course', 'classes']

class CourseSerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'field', 'keywords', 'description', 'formulas', 'units']

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'problemText', 'image', 'problem', 'solution']
