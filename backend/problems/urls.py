from django.urls import path, include
from rest_framework import routers
from .views import ProblemViewSet


# Router URLs
router = routers.DefaultRouter()
router.register(r'problem', ProblemViewSet, basename='exercises')

urlpatterns = [
    path('', include(router.urls)),
]