from django.contrib import admin
from .models import User, UserMetadata

admin.site.register(User)
admin.site.register(UserMetadata)