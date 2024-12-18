from rest_framework import serializers
from .models import User, API_Request, API_Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_active', 'is_staff', 'date_joined']
        read_only_fields = ['id', 'date_joined']  # Campos no modificables

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value


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
