from django.urls import path
from .views import SimplifyEquationView

urlpatterns = [
    path('simplify/', SimplifyEquationView.as_view(), name='simplify_equation'),
]
