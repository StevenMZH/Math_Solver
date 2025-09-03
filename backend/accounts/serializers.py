from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.serializers import ModelSerializer
from .models import UserContentProgress, UserAccount
from courses.models import Course, CourseLesson

from courses.serializers.courses import CourseMeta_serializer
from courses.serializers.lessons import LessonMeta_serializer

User = get_user_model()

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        UserAccount.objects.get_or_create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        fields = ('email', 'password')

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Credenciales inválidas")
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
               
class UserPreferences_Serializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = [
            'id',
            'language',
            'theme',
            'notification',
        ]
        
class UpdateUser_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

    def validate_username(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value