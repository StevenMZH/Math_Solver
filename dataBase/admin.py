from django.contrib import admin
from .models import User, API_Request, API_Response

admin.site.register(User)
admin.site.register(API_Request)
admin.site.register(API_Response)