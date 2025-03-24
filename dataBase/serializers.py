from rest_framework import serializers
from .models import User, API_Request, API_Response, Course, CourseUnit, CourseClass, ClassExercise
import base64

class UserSerializer(serializers.ModelSerializer):
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

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'email', 'username', 'is_active', 'is_staff', 'date_joined']
#         read_only_fields = ['id', 'date_joined']  # Campos no modificables

#     def validate_email(self, value):
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("A user with this email already exists.")
#         return value


class APIRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = API_Request
        fields = ['id', 'type', 'content', 'operation', 'time']
        read_only_fields = ['id', 'time']  # Campos generados automáticamente


class APIResponseSerializer(serializers.ModelSerializer):
    request_detail = APIRequestSerializer(source='request', read_only=True)  # Include related request details

    class Meta:
        model = API_Response
        fields = ['id', 'type', 'request', 'request_detail', 'content', 'time']
        read_only_fields = ['id', 'time']  # Campos generados automáticamente

    def validate(self, data):
        # Custom validation to ensure the request exists.
        if not API_Request.objects.filter(id=data['request'].id).exists():
            raise serializers.ValidationError("The referenced API Request does not exist.")
        return data


class CourseClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseClass
        fields = ['id', 'name', 'class_type', 'keywords', 'content', 'order']


class CourseUnitSerializer(serializers.ModelSerializer):
    classes = CourseClassSerializer(many=True, read_only=True)

    class Meta:
        model = CourseUnit
        fields = ['id', 'name', 'course', 'classes']


class CourseSerializer(serializers.ModelSerializer):
    units = CourseUnitSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'name', 'field', 'keywords', 'description', 'formulas', 'units']

class ClassExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassExercise
        fields = ['id', 'name', 'problemText', 'image', 'problem', 'solution']
