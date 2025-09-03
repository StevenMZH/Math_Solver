from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.serializers import ModelSerializer
from ..models import UserContentProgress, UserAccount
from courses.models import Course, CourseLesson

from courses.serializers.courses import CourseMeta_serializer
from courses.serializers.lessons import LessonMeta_serializer

User = get_user_model()
               
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