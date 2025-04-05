from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserView, CheckUserView, RegisterUserView, APIRequest_View, APIResponse_View,
    CourseViewSet, CourseUnitViewSet, CourseClassViewSet, ClassExerciseViewSet,
    SearchCourseClass_View, get_classDetails
)

# Router URLs
router = routers.DefaultRouter()
router.register(r'users', UserView, 'users')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'units', CourseUnitViewSet, basename='unit')
router.register(r'classes', CourseClassViewSet, basename='class')
router.register(r'exercises', ClassExerciseViewSet, basename='exercise')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Docs
    path('docs/', include_docs_urls(title="dataBase API")),

    # Users Endpoints
    path('users/<str:username>/', UserView.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-detail'),    
    
    # Course Sys Endpoints
    path('courses/<str:course_id>/<str:class_id>/', get_classDetails, name='classDetails'),
    
    # Access (Login/SignUp)
    path('check_user/<str:username>/', CheckUserView.as_view(), name='check-user'),
    path('register/', RegisterUserView.as_view(), name='register-user'),
    
    # Search Course/Class Endpoint    
    path('search/', SearchCourseClass_View.as_view(), name='search'),
    
    # JWT Authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 