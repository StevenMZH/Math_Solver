from flask import Flask, render_template, jsonify, request
from core.interpreter import requestInterpreter

app = Flask(__name__)

title = "Eulerian Hades"
author = "Steven Mendoza"
description = "Math"
math_output = ""

@app.route('/', methods=['GET', 'POST'])
def index():
    math_output = ""
    if request.method == 'POST':
        problem = request.form['math_problem']
        result = requestInterpreter(problem, "")
        print(f"\nRequest: {problem}\n Result(Symplified):{result}\n")
        math_output = f"$$ {result} $$"  # Formato LaTeX para MathJax
    
    return render_template('index.html', title=title, author=author, description=description, math_output=math_output)

@app.route('/graphs')
def graphs():
    return render_template('graphs.html')

@app.route('/graphResult')
def graphResult():
    return render_template('graphResult.html')

@app.route('/template')
def template():
    return render_template('template.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
