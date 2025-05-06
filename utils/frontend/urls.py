from django.urls import path
from . import views

urlpatterns = [
    path('math/', views.math, name='math'),
    path('', views.index, name='index'),
    path('graphTheory/', views.graphTheory, name='graphTheory'),
    path('linealAlgebra/', views.linealAlgebra, name='linealAlgebra'),
    
    path('cs/', views.cs, name='cs'),
    path('introCS/', views.introCS, name='introCS'),    
    path('sortingAlgorithms/', views.sortingAlgorithms, name='sortingAlgorithms'),
    path('searchingAlgorithms/', views.searchingAlgorithms, name='searchingAlgorithms'),    
    path('dataStructures/', views.dataStructures, name='dataStructures'),    

    path('electronics/', views.electronics, name='electronics'),
    path('introCircuits/', views.introCircuits, name='introCircuits'),    
    path('basicCircuits/', views.basicCircuits, name='basicCircuits'),    
    path('digitalCircuits/', views.digitalCircuits, name='digitalCircuits'),    

    path('underConstruction/', views.underConstruction, name='underConstruction'),
    path('template/', views.template, name='template'),
]
