from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.admin_views import UserView
from .views.auth_views import CheckUserView, RegisterView, GoogleLogin
from .views.account_views import AccountView, UpdateUserView, UpdatePreferencesView, UserContentProgressView 

# Router URLs
router = routers.DefaultRouter()
router.register(r'users', UserView, 'users')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
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
    
    # Account Endpoints (Private)
    path('account/', AccountView.as_view(), name='account'), # get_userAccount (token required)
    path('update_user/', UpdateUserView.as_view(), name='update_user'),
    path('update_preferences/', UpdatePreferencesView.as_view(), name='update_preferences'),
    path('register_activity/', UserContentProgressView.as_view(), name='register_activity'),
] 