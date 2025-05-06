from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from .views import (
    CourseViewSet, CourseUnitViewSet, CourseClassViewSet, ClassExerciseViewSet,
    SearchCourseClass_View, get_classDetails
)


# Router URLs
router = routers.DefaultRouter()
router.register(r'course', CourseViewSet, basename='courses')
router.register(r'units', CourseUnitViewSet, basename='units')
router.register(r'lessons', CourseClassViewSet, basename='lessons')
router.register(r'exercises', ClassExerciseViewSet, basename='exercises')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Docs
    path('docs/', include_docs_urls(title="dataBase API")),
    
    # Course Sys Endpoints
    path('course/<str:course_id>/<str:lesson_id>/', get_classDetails, name='lessonDetails'),
    # path('lesson/<str:lesson_id>/', get_classDetails, name='lessonDetails'),

    # Search Course/Class Endpoint    
    path('search/', SearchCourseClass_View.as_view(), name='search'),
] 