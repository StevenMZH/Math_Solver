from sympy import simplify_logic, symbols, SOPform, POSform, parse_expr
from sympy.logic.boolalg import truth_table
import re

class BoolExpression:
    def __init__(self, expression: str):
        self.expression = expression
        self.variables = self.__extractVariables()

    def __extractVariables(self):
        try:
            variables = set(re.findall(r'\b[A-Za-z_][A-Za-z0-9_]*\b', self.expression))
            operators = {"and", "or", "not", "&", "|", "~", "True", "False"}
            return variables - operators

        except Exception:
            return set()

    def simplify(self):
        try:
            simplified_expr = simplify_logic(self.expression)
            return str(simplified_expr)

        except Exception as e:
            return f"Error at Simplifying an Expression: {e}"

    def SOP(self):
        try:
            variables = symbols(list(self.variables))
            expr = simplify_logic(parse_expr(self.expression))
            
            # Generar minterms a partir de la tabla de verdad
            table = list(truth_table(expr, variables))
            minterms = [list(inputs) for inputs, result in table if result]
            sop = SOPform(variables, minterms)
            return str(sop)
        
        except Exception as e:
            return f"Error while SOP Generation: {e}"

    # Da error
    def POS(self):
        try:
            # Asegurar orden consistente de las variables
            variables = symbols(sorted(self.variables))  # Ordenar las variables alfabéticamente
            expr = simplify_logic(parse_expr(self.expression))
            
            # Generar maxterms a partir de la tabla de verdad
            table = list(truth_table(expr, variables))
            maxterms = [list(inputs) for inputs, result in table if not result]

            # Si no hay maxterms (la función es siempre verdadera), retornar la variable simplificada
            if not maxterms:
                return str(expr)

            pos = POSform(variables, maxterms)
            return str(pos)

        except Exception as e:
            return f"Error while POS Generation: {e}"


    def trueTable(self):
        try:
            variables = symbols(list(self.variables))
            expr = simplify_logic(self.expression)
            table = list(truth_table(expr, variables))
            header = list(self.variables) + ["Resultado"]
            rows = []

            for row in table:
                input_values, result = row
                rows.append(list(input_values) + [result])

            return {"Header": header, "Rows": rows}
        
        except Exception as e:
            return f"Error while trueTable Generation: {e}"

    def eval(self, **kwargs):
        try:
            expr = simplify_logic(self.expression)
            variables = symbols(list(self.variables))
            values = {str(var): kwargs.get(str(var), False) for var in variables}
            return expr.subs(values)
        
        except Exception as e:
            return f"Error while Expression Evaluation: {e}"

def boolFormat(expression: str):
    operator_map = {
        '+': '|',
        'or': '|',
        '*': '&',
        'and': '&',
        'not': '~',
        'true': 'True',
        'false': 'False'
    }
    
    # Mapping
    for old, new in operator_map.items():
        expression = expression.replace(old, new)
    
    # Syntaxis Validation
    try:
        expr = parse_expr(expression)
        return str(expr)

    except Exception as e:
        return "Syntax Error"

# Ejemplo de uso:
expression = "A + B * not C"
formatted_expression = boolFormat(expression)
print(formatted_expression)


if __name__ == "__main__":
    expr = BoolExpression("(A & B) | (A & ~B)")
    print("Expresión original:", expr.expression)
    print("Variables utilizadas:", expr.variables)
    print("Expresión simplificada:", expr.simplify())
    print("Forma SOP:", expr.SOP())
    print("Forma POS:", expr.POS())
    truth_table_result = expr.trueTable()
    print("Tabla de verdad:")
    print(truth_table_result["Header"])
    for row in truth_table_result["Rows"]:
        print(row)
    print("Evaluación (A=True, B=False):", expr.eval(A=True, B=False))
