from flask import Flask, render_template, jsonify, request
from root.interpreter import requestInterpreter

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

@app.route('/data')
def data():
    data = {
        "nodes": [
            {"id": "A"},
            {"id": "B"},
            {"id": "C"},
            {"id": "D"}
        ],
        "links": [
            {"source": "A", "target": "B"},
            {"source": "A", "target": "C"},
            {"source": "B", "target": "D"}
        ]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
