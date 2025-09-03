from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import IntegrityError
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from django.core.exceptions import ValidationError
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ObjectDoesNotExist

from .serializers.courses import CourseHeader_serializer, CourseMeta_serializer, CourseContent_serializer, PrivateCourse_serializer
from .serializers.units import PublicUnit_serializer, PrivateUnit_serializer
from .serializers.lessons import LessonHeader_serializer, LessonContent_serializer, PrivateLesson_serializer
from .models import Course, CourseUnit, CourseLesson

# get_lesson (without the courseId)
# get/search filtered courses/lessons
# get_recommended_content


# Course/Unit/Lesson Gets
class PublicCourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(indexable=True)
    serializer_class = CourseContent_serializer
    
# @handle_exceptions
# class PublicUnitViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = CourseUnit.objects.all()
#     serializer_class = PublicUnitSerializer
    
# @handle_exceptions
# class PublicLessonViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = CourseLesson.objects.filter(indexable=True)
#     serializer_class = PublicLessonSerializer



def handle_exceptions(func):
    def wrapper(request, *args, **kwargs):
        try:
            return func(request, *args, **kwargs)
        except IntegrityError:
            return JsonResponse({"error": "Database integrity error"}, status=500)
        except ValidationError as e:
            return JsonResponse({"error": f"Validation error: {str(e)}"}, status=400)
        except PermissionDenied:
            return JsonResponse({"error": "Permission denied"}, status=403)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Object not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return wrapper


# Admin Course/Unit/Lesson CRUD
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = PrivateCourse_serializer
    
class UnitViewSet(viewsets.ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = PrivateUnit_serializer
    
class LessonViewSet(viewsets.ModelViewSet):
    queryset = CourseLesson.objects.all()
    serializer_class = PrivateLesson_serializer



@handle_exceptions
def get_classDetails(request, course_id, lesson_id):
    try:
        lesson = CourseLesson.objects.get(id=lesson_id)
        data = {
            "id": lesson.id,
            "name": lesson.name,
            "type": lesson.type,
            "content": lesson.content_data,
        }
        return JsonResponse(data)
    except CourseLesson.DoesNotExist:
        return JsonResponse({"error": "Class not found"}, status=404)

@handle_exceptions
def get_lesson(request, lesson_id):
    try:
        lesson = CourseLesson.objects.select_related('course').get(id=lesson_id)
        data = {
            "id": lesson.id,
            "name": lesson.name,
            "type": lesson.class_type,
            "content": lesson.content_data,  # actualizado
            "order": lesson.order,
            "level": lesson.level
        }
        return JsonResponse(data)
    except CourseLesson.DoesNotExist:
        return JsonResponse({"error": "Class not found"}, status=404)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
        
# class SearchContentView(APIView):
#     pagination_class = StandardResultsSetPagination

#     def get(self, request):
#         query = request.query_params.get('q', '')
#         if not query:
#             return Response({"detail": "No search term provided"}, status=status.HTTP_400_BAD_REQUEST)

#         filters = Q(name__icontains=query) | Q(keywords__icontains=query)
#         courses = Course.objects.filter(filters, indexable=True)
#         lessons = CourseLesson.objects.filter(filters, indexable=True)

#         paginator = self.pagination_class()
#         courses_page = paginator.paginate_queryset(courses, request)
#         lessons_page = paginator.paginate_queryset(lessons, request)

#         course_data = PublicCourseSerializer(courses_page, many=True).data
#         lesson_data = PublicLessonSerializer(lessons_page, many=True).data

#         return paginator.get_paginated_response({
#             "courses": course_data,
#             "course_classes": lesson_data
#         })
        
        
class SearchContentView(APIView):
    """
    Search for Courses and CourseLesson by name and other parameters.
    """

    def get(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({"detail": "No search term provided"}, status=status.HTTP_400_BAD_REQUEST)

        courses = Course.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )
        course_classes = CourseLesson.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )

        course_data = CourseHeader_serializer(courses, many=True).data
        class_course_data = LessonHeader_serializer(course_classes, many=True).data

        return Response({
            "courses": course_data,
            "course_classes": class_course_data
        }, status=status.HTTP_200_OK)
        