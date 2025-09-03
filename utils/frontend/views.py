from django.shortcuts import render
from django.http import HttpResponse
from .core.interpreter import requestInterpreter

title = "Eulerian Hades"
author = "Steven Mendoza"
description = "Math"

def math(request):
    return render(request, 'math.html')

def index(request):
    math_output = ""
    if request.method == 'POST':
        problem = request.POST.get('math_problem', '')
        result = requestInterpreter(problem, "")
        math_output = f"$$ {result} $$"  # Formato LaTeX para MathJax
    
    return render(request, 'index.html', {
        'title': title,
        'author': author,
        'description': description,
        'math_output': math_output,
    })

def graphTheory(request):
    return render(request, 'graphTheory.html')

def linealAlgebra(request):
    return render(request, 'underConstruction.html')



def cs(request):
    return render(request, 'cs.html')

def introCS(request):
    return render(request, 'introCS.html')

def sortingAlgorithms(request):
    return render(request, 'sortingAlgorithms.html')

def searchingAlgorithms(request):
    context = {'pageTitle' : 'Searching Algorthms'}
    return render(request, 'underConstruction.html', context)

def dataStructures(request):
    # Definir el contenido basado en la URL solicitada
    selected_struct = request.GET.get('struct', 'array')  # Obtener el parámetro 'struct' de la URL
    return render(request, 'dataStructures.html', {
        'selected_struct': selected_struct,
    })




def electronics(request):
    return render(request, 'electronics.html')

def introCircuits(request):
    context = {'pageTitle' : 'Introduction to Circuits'}
    return render(request, 'underConstruction.html', context)

def basicCircuits(request):
    context = {'pageTitle' : 'Basic Circuits'}
    return render(request, 'underConstruction.html', context)

def digitalCircuits(request):
    context = {'pageTitle' : 'Digital Circuits'}
    return render(request, 'underConstruction.html', context)


def underConstruction(request):
    context = {'pageTitle' : 'On Progress Page'}
    return render(request, 'underConstruction.html', context)

def template(request):
    return render(request, 'template.html')