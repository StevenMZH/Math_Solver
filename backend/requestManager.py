from algebraic.boolAlgebra import boolFormat, BoolExpression

def ecuacRequest(content:str, operation:str) -> str:
    pass

def boolRequest(expression:str, operation:str, values: dict) -> str:
    exp = boolFormat(expression)
    if(exp == 'Syntax Error'):
        return exp
    
    exp = BoolExpression(exp)
    if(operation == 'simplify'):
        response = exp.simplify()
    elif(operation == 'SOP'):
        response = exp.SOP
    elif(operation == 'POS'):
        response = exp.POS
    ...

def ecuacSystem_Request(content:str, operation:str) -> str:
    pass

def graphRequest(content:str, operation:str) -> str:
    pass

