from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.serializers import ModelSerializer
from ..models import UserContentProgress, UserAccount
from courses.models import Course, CourseLesson

from courses.serializers.courses import CourseMeta_serializer
from courses.serializers.lessons import LessonMeta_serializer

User = get_user_model()
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class Read_ContentProgress_Serializer(ModelSerializer):
    content_object_data = serializers.SerializerMethodField()

    class Meta:
        model = UserContentProgress
        fields = ['id', 'status', 'content_type', 'content_object_data']
        read_only_fields = ['id', 'account']

    def get_content_object_data(self, obj):
        content = obj.content_object

        if isinstance(content, Course):
            return CourseMeta_serializer(content).data
        elif isinstance(content, CourseLesson):
            return LessonMeta_serializer(content).data
        else:
            # Para tipos de contenido futuros que no tengan aún serializer
            return {
                "id": content.id,
                "type": str(type(content).__name__),
                "message": "Its not part of any kind of content"
            }

class UserContentProgressSerializer(ModelSerializer):
    content_object_data = serializers.SerializerMethodField()

    class Meta:
        model = UserContentProgress
        fields = ['id', 'status', 'content_type', 'object_id', 'content_object_data']
        read_only_fields = ['id', 'account']

    def get_content_object_data(self, obj):
        content = obj.content_object

        if isinstance(content, Course):
            return CourseMeta_serializer(content).data
        elif isinstance(content, CourseLesson):
            return LessonMeta_serializer(content).data
        else:
            # Para tipos de contenido futuros que no tengan aún serializer
            return {
                "id": content.id,
                "type": str(type(content).__name__),
                "message": "Its not part of any kind of content"
            }
               
