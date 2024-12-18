from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from .serializers import UserSerializer, APIRequestSerializer, APIResponseSerializer
from .models import User, API_Request, API_Response

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

class APIRequest_View(viewsets.ModelViewSet):
    serializer_class = APIRequestSerializer
    queryset = User.objects.all()

class APIResponse_View(viewsets.ModelViewSet):
    serializer_class = APIResponseSerializer
    queryset = User.objects.all()