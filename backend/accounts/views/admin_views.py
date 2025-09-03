from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED

from accounts.models import User, UserAccount
from ..serializers import UpdateUser_Serializer 

class UserView(viewsets.ModelViewSet):
    serializer_class = UpdateUser_Serializer
    queryset = User.objects.all()

    def get_object(self):
        """
        Override the `get_object` method to retrieve a user by `username`.
        """
        username = self.kwargs.get("username")
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound("User with this username not found.")

    def perform_create(self, serializer):
        """
        Override the `perform_create` method to automatically create a `UserAccount` for the user,
        and assign the 'admin' role if the user is a superuser.
        """
        user = serializer.save()

        user_account = UserAccount.objects.create(user=user)

        if user.is_superuser:
            user_account.role = 'admin'
            user_account.save()

        return Response(serializer.data, status=HTTP_201_CREATED)



