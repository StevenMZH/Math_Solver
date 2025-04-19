from typing import Any
from math import sin, cos, tan, asin, acos, atan, pi, e, log, sqrt, exp, factorial, floor,fabs, inf

from sympy import symbols, solve, simplify, sympify, factor, expand, latex, parse_expr, Symbol, nan
from sympy import sinh, cosh, tanh, asinh, acosh, atanh
from sympy import diff, integrate, limit, series, summation

from .reservedFuncs import all_mathFuntions

class Equation:
    """
    Represents a mathematical equation.

    Attributes
    ----------
    expression1 : str
        The first expression of the equation.
    expression2 : str, optional
        The second expression of the equation, default is '0'.
    sign : str, optional
        The sign of the equation, default is '='.
    expression1_s : Symbol
        The first expression converted to a symbolic representation.
    expression2_s : Symbol
        The second expression converted to a symbolic representation.
    variables : dict[str, Symbol]
        A dictionary of variables identified in the equation.
    """

    def __init__(self, expression1: str, expression2: str = '0', sign: str = '=') -> None:
        """
        Initializes an Equation instance.

        Parameters
        ----------
        expression1 : str
            The first expression of the equation.
        expression2 : str, optional
            The second expression of the equation, default is '0'.
        sign : str, optional
            The sign of the equation, default is '='.
        """
        self.expression1 = expression1
        self.expression2 = expression2
        self.sign = sign

        self.expression1_s = sympify(expression1)
        self.expression2_s = sympify(expression2)

        self.__reorder()
        self.variables = self.__identifyVariables()
        
    def __identifyVariables(self) -> dict[str, Symbol]:
        """
        Identifies variables in the equation.

        Returns
        -------
        dict[str, Symbol]
            A dictionary where the keys are variable names and the values are symbolic representations.
        """

        def __huntFuntions(ec: str):
            """
            Removes known mathematical functions from the equation string.

            Parameters
            ----------
            ec : str
                The equation string.

            Returns
            -------
            str
                The equation string with functions removed.
            """
            for f in all_mathFuntions:
                if f in ec:
                    ec = ec.replace(f, '')
            return ec

        ec = __huntFuntions(str(self.expression1_s))
        variables = set()
        
        for c in ec:
            if c.isalpha() and c != 'e':
                variables.add(c)
        
        return {var: symbols(var) for var in variables}
    
    def __reorder(self) -> None:
        """
        Reorders the equation to move all terms to the left side.
        """
        reorderExpression = simplify(self.expression1_s - self.expression2_s)
        
        self.expression1_s = reorderExpression
        self.expression1 = str(reorderExpression)
        self.expression2 = '0'
        self.expression2_s = sympify(self.expression2)
        return

    def getSymplified(self) -> Symbol:
        """
        Simplifies the equation.

        Returns
        -------
        Symbol
            The simplified symbolic expression.
        """
        return simplify(self.expression1_s)
    
    def getFactorized(self) -> Symbol:
        """
        Factorizes the equation.

        Returns
        -------
        Symbol
            The factorized symbolic expression.
        """
        return factor(self.expression1_s)
    
    def getExpanded(self) -> Symbol:
        """
        Expands the equation.

        Returns
        -------
        Symbol
            The expanded symbolic expression.
        """
        return expand(self.expression1_s)

    def getSolution(self, variable: str) -> Any:
        """
        Solves the equation for the specified variable.

        Parameters
        ----------
        variable : str
            The variable to solve for.

        Returns
        -------
        Any or None
            The solution(s) for the variable if found, otherwise None.
        """
        if variable in self.variables.keys():
            return solve(self.expression1_s, self.variables[variable])        
        return None
    
    def getEval(self, variable: str, value: (int | float)) -> Any:
        """
        Evaluates the equation by substituting a value for the specified variable.

        Parameters
        ----------
        variable : str
            The variable to substitute.
        value : int or float
            The value to substitute for the variable.

        Returns
        -------
        Any or None
            The evaluated expression if the variable is found, otherwise None.
        """
        if(variable in self.variables.keys()):
            return self.expression1_s.subs( self.variables[variable] , value)
        return None

def toLatex(string: str) -> str:
    expr = sympify(string)    
    return latex(expr)

def toRawLatex(string: str) -> str:
    raw = parse_expr(string, evaluate=False)
    return latex(raw)

if __name__ == '__main__':

    '''
    # Crear instancias de Equation
    eq1 = Equation('2*x*y + 3*x', '4*x')
    eq2 = Equation('x**2 + 3*x - 2')
    eq3 = Equation('sin(x) + cos(x)', '1', '>')

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
