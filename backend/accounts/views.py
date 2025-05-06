from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User

from google.oauth2 import id_token
from google.auth.transport import requests
from allauth.socialaccount.models import SocialLogin, SocialAccount
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

from .serializers import RegisterSerializer, LoginSerializer
from .serializers import UserSerializer
from .models import User, UserMetadata


import requests
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests

from django.contrib.auth import get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
import requests


# User CRUD
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        """
        Sobrescribimos el método `get_object` para buscar un usuario por `username`.
        """
        username = self.kwargs.get("username")
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound("User with this username not found.")

class CheckUserView(APIView):
    def get(self, request, email):
        exists = User.objects.filter(email=email).exists()
        return Response({'exists': exists}, status=status.HTTP_200_OK)


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
        return user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


def get_birthdate(access_token):
    url = "https://people.googleapis.com/v1/people/me?personFields=birthdays,photos"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return None


class GoogleLogin(APIView):
    def post(self, request):
        access_token = request.data.get("access_token")
        id_token = request.data.get("id_token")

        if not access_token or not id_token:
            return Response({"detail": "Faltan datos"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            idinfo = google_id_token.verify_oauth2_token(id_token, google_requests.Request())

            email = idinfo.get("email")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            picture = idinfo.get("picture", "")
            
            data = get_birthdate(access_token)
            birthdate = None
            if data and "birthdays" in data:
                birthdate = data["birthdays"][0]["date"]
            
            sub = idinfo.get("sub")

            if not email:
                return Response({"detail": "No se pudo obtener el email"}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=email, defaults={
                "username": email.split("@")[0],
                "first_name": first_name,
                "last_name": last_name,
                "profile_picture": picture,
                "birth_date": birthdate,
            })

            if not created:
                updated = False
                if user.first_name != first_name:
                    user.first_name = first_name
                    updated = True
                if user.last_name != last_name:
                    user.last_name = last_name
                    updated = True
                if user.profile_picture != picture:
                    user.profile_picture = picture
                    updated = True
                if birthdate and user.birth_date != birthdate:
                    user.birth_date = birthdate
                    updated = True
                if updated:
                    user.save()

            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Autenticado correctamente",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "email": user.email,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "profile_picture": user.profile_picture,
                    "birth_date": user.birth_date,
                }
            })

        except ValueError:
            return Response({"detail": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)
