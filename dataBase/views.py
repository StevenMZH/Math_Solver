from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.authtoken.models import Token
from django.http import JsonResponse
from django.db.models import Q
from django.contrib.auth.models import User

from .serializers import UserSerializer, APIRequestSerializer, APIResponseSerializer, CourseSerializer, CourseUnitSerializer, CourseClassSerializer, ClassExerciseSerializer
from .models import User, API_Request, API_Response, Course, CourseUnit, CourseClass, ClassExercise




# User CRUD
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        """
        Sobrescribimos el método `get_object` para buscar un usuario por `username`.
        """
        username = self.kwargs.get("username")
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound("User with this username not found.")

class CheckUserView(APIView):
    def get(self, request, username):
        exists = User.objects.filter(username=username).exists()
        return Response({'exists': exists}, status=status.HTTP_200_OK)

class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Request/Response System CRUD
class APIRequest_View(viewsets.ModelViewSet):
    serializer_class = APIRequestSerializer
    queryset = User.objects.all()

class APIResponse_View(viewsets.ModelViewSet):
    serializer_class = APIResponseSerializer
    queryset = User.objects.all()


# Course System CRUD
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseUnitViewSet(viewsets.ModelViewSet):
    queryset = CourseUnit.objects.all()
    serializer_class = CourseUnitSerializer

class CourseClassViewSet(viewsets.ModelViewSet):
    queryset = CourseClass.objects.all()
    serializer_class = CourseClassSerializer

class ClassExerciseViewSet(viewsets.ModelViewSet):
    queryset = ClassExercise.objects.all()
    serializer_class = ClassExerciseSerializer

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

def get_classDetails(request, course_id, class_id):
    try:
        course_class = CourseClass.objects.get(id=class_id)
        data = {
            "id": course_class.id,
            "name": course_class.name,
            "type": course_class.class_type,
            "content": course_class.content,
            "order": course_class.order,
        }
        return JsonResponse(data)
    except CourseClass.DoesNotExist:
        return JsonResponse({"error": "Class not found"}, status=404)
    

class SearchCourseClass_View(APIView):
    """
    Search for Courses and CourseClasses by name and other parameters.
    """

    def get(self, request):
        query = request.query_params.get('q', '')  # El término de búsqueda
        if not query:
            return Response({"detail": "No search term provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Buscar en los modelos `Course` y `CourseClass`
        courses = Course.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )
        course_classes = CourseClass.objects.filter(
            Q(name__icontains=query) | Q(keywords__icontains=query)
        )

        # Serializar los resultados
        course_data = CourseSerializer(courses, many=True).data
        class_course_data = CourseClassSerializer(course_classes, many=True).data

        # Retornar la respuesta combinada
        return Response({
            "courses": course_data,
            "course_classes": class_course_data
        }, status=status.HTTP_200_OK)