from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse
from django.db.models import Q
from .serializers import CourseSerializer, UnitSerializer, LessonSerializer, ExerciseSerializer
from .models import Course, CourseUnit, CourseLesson, Exercise

# Course System CRUD
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseUnitViewSet(viewsets.ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = UnitSerializer

class CourseClassViewSet(viewsets.ModelViewSet):
    queryset = CourseLesson.objects.all()
    serializer_class = LessonSerializer

class ClassExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    def create(self, request, *args, **kwargs):
        # Obtener la URL de la imagen directamente desde la solicitud
        image_url = request.data.get('image')

        # Si la URL de la imagen es válida, crear el objeto
        if image_url:
            data = request.data.copy()
            data['image'] = image_url  # Asignar la URL de la imagen al campo 'image'

        # Continuar con el proceso de creación del objeto
        return super().create(request, *args, **kwargs)

# SearchBar
# def searchCourse_Class(request):
#     query = request.GET.get('q', '')  # Obtiene el parámetro `q`
#     if query:
#         results = Course.objects.filter(
#             Q(name__icontains=query) |
#             Q(description__icontains=query)
#         ).distinct()
#         data = [
#             {'id': course.id, 'name': course.name, 'description': course.description}
#             for course in results
#         ]
#     else:
#         data = []
#     return JsonResponse({'results': data})

def get_classDetails(request, course_id, lesson_id):
    try:
        course_class = CourseLesson.objects.get(id=lesson_id)
        data = {
            "id": course_class.id,
            "name": course_class.name,
            "type": course_class.class_type,
            "content": course_class.content,
            "order": course_class.order,
        }
        return JsonResponse(data)
    except CourseLesson.DoesNotExist:
        return JsonResponse({"error": "Class not found"}, status=404)
    

class SearchCourseClass_View(APIView):
    """
    Search for Courses and CourseClasses by name and other parameters.
    """

    def get(self, request):
        query = request.query_params.get('q', '')  # El término de búsqueda
        if not query:
            return Response({"detail": "No search term provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Buscar en los modelos `Course` y `CourseLesson`
        courses = Course.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )
        course_classes = CourseLesson.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )

        # Serializar los resultados
        course_data = CourseSerializer(courses, many=True).data
        class_course_data = LessonSerializer(course_classes, many=True).data

        # Retornar la respuesta combinada
        return Response({
            "courses": course_data,
            "course_classes": class_course_data
        }, status=status.HTTP_200_OK)