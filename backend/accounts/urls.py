from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserView, CheckUserView, RegisterView, GoogleLogin
)

# Router URLs
router = routers.DefaultRouter()
router.register(r'users', UserView, 'users')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Users Endpoints
    # path('users/<str:username>/', UserView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-detail'),    

    # Check User existence
    path('check_user/<str:email>/', CheckUserView.as_view(), name='check-user'),
    
    # JWT Endpoint
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # OAuth with Google
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
    path('auth/google/', GoogleLogin.as_view(), name='GoogleLogin'),
] 