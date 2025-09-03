from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.utils.timezone import now

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..serializers import UserContentProgressSerializer, UpdateUser_Serializer
from ..models import UserContentProgress

from courses.models import CourseLesson

# update_badges
# update_points
# update_rol
# delete_account


# account/
class AccountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        account = user.account
        account.last_check_in = timezone.now()
        
        now = timezone.now().date()
        last = account.last_activity.date() if account.last_activity else None
        if last and (now - last).days >= 2:
            account.daily_streak = 0
            
        account.save()
        
        # Obtener y serializar el contentProgress
        content_progress_qs = account.progress_entries.all()
        content_progress_serialized = UserContentProgressSerializer(content_progress_qs, many=True).data

        return Response({
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'profile_picture': user.profile_picture,
            'birth_date': user.birth_date,
            "date_joined": user.date_joined,
            
            'rol': user.account.rol,
    
            'last_check_in': user.account.last_check_in,
            'last_activity': user.account.last_activity,
            'daily_streak': user.account.daily_streak,
            
            'longest_daily_streak': user.account.longest_daily_streak,
            'badges': user.account.badges,
            'points': user.account.points,
            'level': user.account.level,
            
            'language': user.account.language,
            'theme': user.account.theme,
            'notifications': user.account.notifications,
            
            'contentProgress': content_progress_serialized,
        })

# update_user/
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = UpdateUser_Serializer(
            instance=request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Preferences updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# update_preferences/
class UpdatePreferencesView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        account = user.account
        data = request.data

        account.language = data.get('language')
        account.theme = data.get('theme')
        account.notification = data.get('notification')

        account.save()
        
        return Response({"message": "Preferences updated successfully."}, status=status.HTTP_200_OK)

# register_activity/
class UserContentProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        progress = UserContentProgress.objects.filter(account=request.user.account)
        serializer = UserContentProgressSerializer(progress, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        account = request.user.account

        try:
            content_type = ContentType.objects.get(model=data['content_type'].lower())
            data['content_type'] = content_type.id
        except ContentType.DoesNotExist:
            return Response({'error': 'Invalid content_type'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserContentProgressSerializer(data=data)
        if serializer.is_valid():
            content_progress = serializer.save(account=account)

            if not account.last_activity:
                account.daily_streak = 1
            elif account.last_activity.date() != timezone.now().date():
                account.daily_streak += 1
            
            account.last_activity = now()
            
            if account.longest_daily_streak < account.daily_streak:
                account.longest_daily_streak = account.daily_streak
            account.save()
            
            # Complex Querie: Move to fronted compare lessons & contentProcess
            # Search for course completion
            if content_type.model == 'courselesson':
                check_courseCompletion(account, content_progress)
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
def check_courseCompletion(account, content_progress):
    lesson = content_progress.content_object  
    unit = lesson.unit

    if unit:
        course = unit.course

        total_lessons = CourseLesson.objects.filter(unit__course=course).count()
        completed_lessons = UserContentProgress.objects.filter(
            account=account,
            content_type=ContentType.objects.get(model='courselesson'),
            object_id__in=CourseLesson.objects.filter(unit__course=course)
        ).count()

        if total_lessons == completed_lessons:
            # Marcar curso como completado
            course_ct = ContentType.objects.get(model='course')
            course_progress, created = UserContentProgress.objects.get_or_create(
                account=account,
                content_type=course_ct,
                object_id=course.id,
                defaults={'status': 'completed'}
            )
            if not created:
                course_progress.status = 'completed'
                course_progress.save()
                
        # Eliminar progreso de las lecciones (Sirve para el conteo despues miramos)
        # UserContentProgress.objects.filter(
        #     account=account,
        #     content_type=ContentType.objects.get(model='courselesson'),
        #     object_id__in=CourseLesson.objects.filter(course=course).values_list('id', flat=True)
        # ).delete()

    
    