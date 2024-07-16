
from math import sin, cos, tan, asin, acos, atan, pi, e, log, sqrt, exp, factorial, floor,fabs, inf
from sympy import symbols, solve, simplify, sympify, factor, expand, Symbol, nan
from sympy import sinh, cosh, tanh, asinh, acosh, atanh
from sympy import diff, integrate, limit, series, summation
from typing import Any

from .mathFunctions import all_mathFuntions

class Ecuation:

    def __init__(self, expression1:str, expression2:str = '0', sign:str = '=') -> None:
        
        self. expression1 = expression1
        self. expression2 = expression2
        self.sign = sign

        self. expression1_s = sympify(expression1)
        self. expression2_s = sympify(expression2)

        self.reorder()
        self.variables = self.__identifyVariable()

        
    def __identifyVariable(self) -> dict[str, Symbol]:

        def __huntFuntions(ec: str):
            for f in all_mathFuntions:
                if( f in ec ):
                    ec = ec.replace(f, '')
            return ec

        ec = __huntFuntions( str(self.expression1_s) )
        variables = set()
        
        for c in ec:
            if c.isalpha() and c != 'e':
                variables.add(c)
        
        return { var : symbols(var) for var in variables }
    
    def reorder(self) -> None:
        reorderExpression = simplify(self.expression1_s - self.expression2_s)
        
        self.expression1_s = reorderExpression
        self.expression1 = str(reorderExpression)
        self.expression2 = '0'
        self.expression2_s = sympify(self.expression2)
        return

    def getSymplified(self) -> Symbol:
        return simplify(self.expression1_s)
    
    def getFactorized(self) -> Symbol:
        return factor(self.expression1_s)
    
    def getExpanded(self) -> Symbol:
        return expand(self.expression1_s)

    def getSolution(self, variable: str) -> (Any | None):
        if(variable in self.variables.keys()):
            return solve(self.expression1_s, self.variables[variable])        
        return None
    
    def getEval(self, variable: str , value: (int | float) ) -> (Any | None):
        if(variable in self.variables.keys()):
            return self.expression1_s.subs( self.variables[variable] , value)
        return None

# In progress...
class ecuationSystem:

    def __init__(self, ecuations: list[Ecuation] ) -> None:
        self.ecuations = ecuations
        self.cuantity = len(ecuations)

if __name__ == '__main__':

    '''
    # Crear instancias de Ecuation
    eq1 = Ecuation('2*x*y + 3*x', '4*x')
    eq2 = Ecuation('x**2 + 3*x - 2')
    eq3 = Ecuation('sin(x) + cos(x)', '1', '>')

    # Imprimir resultados de los métodos
    print("Expression 1:")
    print("Vars: ",eq1.variables)
    print("Reordered:", eq1.getExpanded())
    print("Factorized:", eq1.getFactorized())
    print("Type:", eq1.type)
    print("Simplified:", eq1.getSymplified())
    print("Solution:", eq1.getSolution('x'))
    print("Evaluated at x=1:", eq1.getEval('x',1))
    print()

    print("Expression 2:")
    print("Reordered:", eq2.getExpanded())
    print("Factorized:", eq2.getFactorized())
    print("Type:", eq2.type)
    print("Simplified:", eq2.getSymplified())
    print("Solution:", eq2.getSolution('x'))
    print("Evaluated at x=1:", eq2.getEval('x',1))
    print()

    print("Expression 3:")
    print("Reordered:", eq3.getExpanded())
    print("Factorized:", eq3.getFactorized())
    print("Type:", eq3.type)
    print("Simplified:", eq3.getSymplified())
    print("Solution:", eq3.getSolution('x'))
    print("Evaluated at x=1:", eq3.getEval('x',1))

    '''
