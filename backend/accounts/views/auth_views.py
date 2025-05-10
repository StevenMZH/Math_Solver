from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from google.auth.transport import requests
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests

from datetime import date
import requests

from ..serializers import RegisterSerializer
from ..models import User, UserAccount


class CheckUserView(APIView):
    def get(self, request, email):
        exists = User.objects.filter(email=email).exists()
        return Response({'exists': exists}, status=status.HTTP_200_OK)

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
                birthdate = date(
                data["birthdays"][0]["date"]["year"],
                data["birthdays"][0]["date"]["month"],
                data["birthdays"][0]["date"]["day"]
            )
            
            sub = idinfo.get("sub")

            if not email:
                return Response({"detail": "No se pudo obtener el email"}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.update_or_create(
                email=email,
                defaults={
                    "username": email.split("@")[0],
                    "first_name": first_name,
                    "last_name": last_name,
                    "profile_picture": picture,
                    "birth_date": birthdate,
                }
            )


            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Autenticado correctamente",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })

        except ValueError:
            return Response({"detail": "Token inválido"}, status=status.HTTP_400_BAD_REQUEST)
   

@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    if created:
        UserAccount.objects.create(user=instance)
