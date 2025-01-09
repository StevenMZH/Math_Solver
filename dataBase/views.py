from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.http import JsonResponse
from django.db.models import Q

from .serializers import UserSerializer, APIRequestSerializer, APIResponseSerializer, CourseSerializer, CourseUnitSerializer, CourseClassSerializer
from .models import User, API_Request, API_Response, Course, CourseUnit, CourseClass


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

# SearchBar
def searchCourse_Class(request):
    query = request.GET.get('q', '')  # Obtiene el parámetro `q`
    if query:
        results = Course.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query)
        ).distinct()
        data = [
            {'id': course.id, 'name': course.name, 'description': course.description}
            for course in results
        ]
    else:
        data = []
    return JsonResponse({'results': data})

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
