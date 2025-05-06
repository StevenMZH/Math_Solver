from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include('solvers.urls')),
    path('courses/', include('courses.urls')),
    path('account/', include('accounts.urls')),
            
    # allAuth Authentication
    path('auth/', include('dj_rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/social/', include('allauth.socialaccount.urls')),
]
