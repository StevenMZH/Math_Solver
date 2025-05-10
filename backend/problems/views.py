from rest_framework import viewsets
from .serializers import ExerciseSerializer
from .models import Exercise

class ProblemViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

    def create(self, request, *args, **kwargs):
        image_url = request.data.get('image')

        if image_url:
            data = request.data.copy()
            data['image'] = image_url

        return super().create(request, *args, **kwargs)
