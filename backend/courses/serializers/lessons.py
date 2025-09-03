from rest_framework import serializers
from ..models import CourseLesson

# Search Result Links
class LessonHeader_serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = [
            'id',
            'name',
            'type',
        ]


# /courses/<course:id> returned with course fetch
class LessonMeta_serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = [
            'id',
            'name',
            'type',
            'order',
        ]

# /courses/<course:id>/<lesson:id>
class LessonContent_serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = [
            'id',
            'name',
            'content_data',
        ]

# Admin
class PrivateLesson_serializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLesson
        fields = '__all__'

