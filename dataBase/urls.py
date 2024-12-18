from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import UserView, APIRequest_View, APIResponse_View

router = routers.DefaultRouter()
router.register(r'users', UserView, 'users')

urlpatterns = [
    path('users/<str:username>/', UserView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-detail'),
    path('', include(router.urls)),
    path('docs/', include_docs_urls(title="dataBase API")),
]