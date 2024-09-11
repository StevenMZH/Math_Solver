from django.urls import path
from . import views

urlpatterns = [
    path('math/', views.math, name='math'),
    path('cs/', views.cs, name='cs'),
    path('electronics/', views.electronics, name='electronics'),
    path('', views.index, name='index'),
    path('graphs/', views.graphs, name='graphs'),
    path('linealAlgebra/', views.linealAlgebra, name='linealAlgebra'),
    path('graphResult/', views.graphResult, name='graphResult'),
    path('sortingAlgorithms/', views.sortingAlgorithms, name='sortingAlgorithms'),
    path('template/', views.template, name='template'),
]
