from django.contrib import admin
from .models import User, UserAccount, UserContentProgress

admin.site.register(User)
admin.site.register(UserAccount)
admin.site.register(UserContentProgress)