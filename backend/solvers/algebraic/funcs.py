import math

def factorial(n: float) -> float:
    """
    Calcula el factorial de un número flotante o entero utilizando la función gamma.
    Devuelve "undefined" para enteros negativos.

    Args:
        n (float): Número para calcular el factorial.

    Returns:
        float: Factorial del número o "nan" si no está definido.
    """
    if isinstance(n, int) and n < 0:
        return float('nan')
    
    return math.gamma(n + 1)

print(factorial(5.5))  # Ejemplo para número flotante positivo
print(factorial(-2.5))  # Ejemplo para número flotante negativo
print(factorial(-2))  # Ejemplo para entero negativo
