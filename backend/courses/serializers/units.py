from rest_framework import serializers
from ..models import CourseUnit
from .lessons import LessonMeta_serializer

class PublicUnit_serializer(serializers.ModelSerializer):
    lessons = LessonMeta_serializer(many=True, read_only=True)

    class Meta:
        model = CourseUnit
        fields = ['id', 'name', 'lessons']

        
class PrivateUnit_serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = '__all__'
