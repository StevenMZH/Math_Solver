from rest_framework import serializers
from ..models import Course
from .units import PublicUnit_serializer

# Search Links
class CourseHeader_serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'field',
        ]

# Course Preview on CourseHub
class CourseMeta_serializer(serializers.ModelSerializer):
    units = PublicUnit_serializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = [
            'id',
            'name',
            'field',
            'description',
            'units',
            'level'
        ]

# /courses/<course:id>
class CourseContent_serializer(serializers.ModelSerializer):
    units = PublicUnit_serializer(many=True, read_only=True)

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

# Admin
class PrivateCourse_serializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
