from django.shortcuts import render
from django.http import HttpResponse
from .core.interpreter import requestInterpreter

title = "Eulerian Hades"
author = "Steven Mendoza"
description = "Math"

def math(request):
    return render(request, 'math.html')

def cs(request):
    return render(request, 'cs.html')

def electronics(request):
    return render(request, 'electronics.html')

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

def graphs(request):
    return render(request, 'graphs.html')

def linealAlgebra(request):
    return render(request, 'linealAlgebra.html')

def graphResult(request):
    return render(request, 'graphResult.html')

def sortingAlgorithms(request):
    return render(request, 'sortingAlgorithms.html')

def template(request):
    return render(request, 'template.html')
