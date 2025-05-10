from django.urls import path, include
from rest_framework import routers
from .views import (
    CourseViewSet, UnitViewSet, LessonViewSet, PublicCourseViewSet,
    SearchContentView, get_classDetails, get_lesson
)

# Router URLs
router = routers.DefaultRouter()
router.register(r'courses', PublicCourseViewSet, basename='courses')
router.register(r'admin/courses', CourseViewSet, basename='courses admin access')
router.register(r'units', UnitViewSet, basename='units')
router.register(r'lessons', LessonViewSet, basename='lessons')

urlpatterns = [
    # Router URLs
    path('', include(router.urls)),
    
    # Course Sys Endpoints
    path('courses/<str:course_id>/<str:lesson_id>/', get_classDetails, name='lessonDetails'),
    path('courses/<str:lesson_id>/', get_lesson, name='lessonDetails'),
    

    # Search Course/Class Endpoint    
    path('search/', SearchContentView.as_view(), name='search'),
] 