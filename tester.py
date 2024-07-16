from sympy import nan
from root.interpreter import requestInterpreter
from math import inf, isinf

undefined_Cases = [
    ''
]
nan_Cases = [
    '0/0',
    'inf / inf',
    '0 * inf',
    'inf - inf',
    '0**0',
    'inf ** 0'
]
infinity_Cases = [
    ''
]
zero_Cases = [
    ''
]
indeterminate_Cases = [
    ''
]

def verifyCases(cases: list[str], wantedResult):
    print(f"\n{wantedResult} Cases:")
    for c in cases:
        result = requestInterpreter(c, "")

        if(result == wantedResult):
            print("T",end='\t')
        else:
            print(f"F ({result})",end='\t')
        print(f"{c}", end='\n')

def testCases():
    pass


if __name__ == '__main__':
    verifyCases(nan_Cases,nan)
    print(isinf)



