
class booleanExpression:

    def __init__(self, expression: str):
        self.expression = expression
        self.simplified = expression
        self.values = self.__getVariables()
        self.result = None

    def __getVariables(self) -> dict[str, bool]:
        funcs = ['+', 'or', '*', 'and', '~', 'not', '!', 'not']

        ec = self.expression
        variables = set()

        for f in funcs:
            if f in ec:
                ec = ec.replace(f, '')

        for c in ec:
            if c.isalpha():
                variables.add(c)
        
        return {var:None for var in variables}

    def __booleanFormat(self):
        meanings = {'+': ' or ', '*': ' and ', '~': ' not ', '!': ' not '}
        expression = self.expression

        for key in meanings.keys():
            if(key in expression):
                expression.replace(key, meanings[key])

        return expression.upper()

    def mathFormat(self):
        # Replacing operations
        meanings = {'or':'+', 'and':'*', 'not':'!'}
        expression = self.expression

        for key in meanings.keys():
            if(key in expression):
                expression.replace(key, meanings[key])

        expression = expression.upper()

        newFormat_expression = []
        negation = False
        last_isAlpha = False
        last2_isAlpha = False

        try:
            for i, c in enumerate(expression):
                # Eliminacion de Espacios
                if(c == ' ' or c == '*'):
                    continue                    

                # Anadir ' + ' por cada '+', para dejar claro los terms 
                elif(c == '+'):
                    newFormat_expression.append(' + ')

                # Anadir las multiplicaciones implicitas
                elif(last_isAlpha and (c.isalpha() or c=='(')):
                    newFormat_expression.append('*')
                    newFormat_expression.append(c)         

                # Gestion de NOTs
                elif(negation):
                    if(c == '('):
                        if(i-2 >= 0):
                            if(expression[i-2] == ')'):
                                newFormat_expression.append('*')
                        newFormat_expression.append('!(')

                    elif(c == ')'):
                        return 'Error'
                    else:
                        newFormat_expression.append(c.lower())    
                    negation = False

                elif(c =='!'):
                    if(i-1 >= 0):
                        if(c == '!' and expression[i] == '!' and negation):
                            negation = False
                            continue

                    negation = True

                    if(i-1 >= 0 and len(expression) > i+1):
                        if(expression[i-1].isalpha() or expression[i-1] == '*' and (expression[i+1].isalpha())):
                            newFormat_expression.append('*')

                    if (len(expression) == i+1):
                        return 'Error'

                # Adicion de Variables
                else:
                    newFormat_expression.append(c)

                last2_isAlpha = last_isAlpha
                last_isAlpha = c.isalpha() or c==')'

        except Exception:
            return 'Error'

        result = ''.join(newFormat_expression)
        self.expression = result
        return result

    def simplify(self):
        record = [self.expression]
        newExp = self.mathFormat()
        record.append(newExp)

        def __getDepth(expression:str) -> int:
            deepest = -1
            depth = 0

            for c  in expression:
                if(c == '('):
                    depth += 1
                    if(depth > deepest):
                        deepest = depth

                elif(c == ')'):
                    depth -= 1

            return deepest

        def __bracketsDFS(expression:str) -> list[list[int]]:
            deepest = -1
            depth = 0
            openingBracket = 0
            closingBracket = 0
            bracketIndexes = []

            for i, c  in enumerate(expression):
                if(c == '('):
                    depth += 1

                    if(depth > deepest):
                        deepest = depth
                    
                    if(deepest == depth):
                        openingBracket = i

                elif(c == ')'):
                    if(deepest == depth):
                        closingBracket = i
                        bracketIndexes.append([openingBracket, closingBracket])
                    depth -= 1

            return bracketIndexes

        def __simplifyMorgan(expression, openingBracket, closingBracket) -> str:
            # Morgan Testing
            Morgan = False
            if(openingBracket - 1 >= 0):
                if(expression[openingBracket-1] == '!'):
                    Morgan = True

            bracketContent = expression[openingBracket: closingBracket]
            terms = bracketContent.split(' + ')
            
            if not Morgan:
                return bracketContent


            # DeMorgan Theorem
            ans = '!'+bracketContent # '!(bracketContent) = Ans'
            aux = []
            for i in terms:
                if('*' in i and len(terms) > 1):
                    aux.append('(')
            
                for j in i:
                    if(j == '*'):
                        aux.append(' + ')    
                    else:
                        aux.append( j.upper() if j.islower() else j.lower())
                
                if('*' in i and len(terms) > 1):    
                    aux.append(')')
                
                if(i != terms[-1]):
                    aux.append('*')

            bracketContent = ''.join(aux)
        
            ans = ans + ' = ' + bracketContent
            record.append(ans)
            return bracketContent

        def __simplifyFactors(expression:str, bracketIndexes:list[list[int]]):
            ans = ''
            for opening, closing in bracketIndexes:
                factor = expression[opening:closing+1]
                
                # Case for 1 factor at max depth
                if(ans == ''):
                    if(len(bracketIndexes) == 1):
                        factor.replace('(', '')
                        factor.replace(')', '')
                        break

                # Product of Factors
                if('+' not in factor and '+' not in ans):
                    ans = ans[1:] + '*' + factor[1:-1]

                # Product of Polynomial
                else:
                    aux = factor.replace(' ', '').replace('(','').replace(')','').split('+')
                    ans = " + ".join( [ans+'*'+f for f in aux] )
            ans = expression[0:bracketIndexes[0][0]] + '(' + ans + ')' + expression[bracketIndexes[-1][1] + 1: ]
            return ans

        def __simplifyTheorems(expression:str, bracketIndexes:list[list[int]]):    
            
            # Definition of terms
            terms = expression[bracketIndexes[0][0]:bracketIndexes[0][1]+1]
            terms = terms.replace('(','').replace(')','').replace(' ','').split('+')
            terms = [set(t.replace('*','')) for t in terms]
            aux = terms
            print('Terms: ',aux)

            # Simplification by Theorems
            for i, A in enumerate(terms):
                for j, B in enumerate(terms):                        

                    # (!A*A) = 0
                    negated = [x for x in list(A) if x.islower()] 
                    for c in negated:
                        if(c.upper() in A):
                            aux[i] = set('0')
                            break
                    
                    if(i == j):
                        continue
                    
                    # A + A = A
                    elif(A | B == B):
                        aux[j] = set('0')

                    # A + AB = A
                    elif(A.issubset(B)):
                        aux[j] = set('0')

            # reFormating                                
            ans = ' + '.join(['*'.join(sets) for sets in aux if '0' not in sets])
            ans = ans if (ans != '') else '0'
            print('Terms: ',aux)
            print('Expression: ',expression)
            print('Ans: ',ans)
            return ans

        def __simplify_deepestLevel(expression:str) -> str:
            lastClosure = -1
            ans = ''

            # Simplification by Morgan Law
            bracketIndexes = __bracketsDFS(expression)
            for opening, closing in bracketIndexes:
                ans = ans + newExp[lastClosure+1 :opening - (1 if newExp[opening-1] == '!' else 0)] + __simplifyMorgan(expression, opening, closing+1)
                lastClosure = closing
            ans = ans + newExp[closing+1:]
            record.append(ans)

            # Product of Factors
            ans =  __simplifyFactors(ans, __bracketsDFS(ans))
            record.append(ans)
            
            # Simplification by Theorems
            ans = __simplifyTheorems(ans, __bracketsDFS(ans))
            record.append(ans)

            # Simplification of two Deepest Hierarchy Level 
            return ans


        # Simplification from the deepest level to the top
        while( __getDepth(newExp) > -1):
            newExp = __simplify_deepestLevel(newExp)

        self.simplified = newExp
        return record

    def eval(self):
        pass


    def isEquivalent(self, expression1:str, expression2:str):
        pass

def booleanRequest(expression: str):
    pass

def booleanTesting():
    # Entries, mathFormat, simplified
    formatTests = [
        ['', ''],
        ['a!', 'Error'],
        ['a+b*c', 'A + B*C'],
        ['!A + B', 'a + B'],
        ['!aB + C', 'a*B + C'],
        ['!A!B', 'a*b'],
        ['(a + b)(A + B)', '(A + B)*(A + B)'],
        ['((a*b + a)(c + a*!c))', '((A*B + A)*(C + A*c))'],
        ['( !(a + c)!(b + d)*(a + b) )', '(!(A + C)*!(B + D)*(A + B))'],
        ['!a!(a+b)!(A!B) + c', 'a*!(A + B)*!(A*b) + C']
    ]

    simpleTests = [
        ['', ''],
        ['a!', 'Error'],
        ['a+b*c', 'A + B*C'],
        ['!A + B', 'a + B'],
        ['!aB + C', 'a*B + C'],
        ['!A!B', 'a*b'],
        ['(a + b)(A + B)', 'A + B'],
        ['((a*b + a)(c + a*!c))', 'A'],
        ['( !(a + c)!(b + d)*(a + b) )', '0'],
        ['!a!(a+b)!(A!B) + c', 'a*b + C']
    ]

    morganTests = [
        ['!AB', 'a*B'],
        ['!(AB)', 'a + b'],
        ['!A+B', 'a + B'],
        ['!(A + B)', 'a*b'],
        ['!(AB)!(CD)', '((a+b)*(c+d))'],
        ['!( !(AB)!(CD) )', '(A*B + C*D)'],
    ]

    theoremTests = [
        ['A + 0', 'A'],
        ['A*0', '0'],
        
        ['A + 1', '1'],
        ['A*1', 'A'],
        
        ['!!A', 'A'],
        ['!!(A+B)', 'A + B'],
        
        ['A + A', 'A'],
        ['A*A', 'A'],

        ['!A + A', '1'],
        ['!A * A', '0'],

        ['A + AB', 'A'],
        ['A(A + B)', 'A'],
    
        ['A(B + C)', 'A*B + A*C'],
        ['(A + B)(A + C)', 'A + B*C']
    ]

    simplificationTests = [
        ['', '']
    ]

    evalTest = []

    comparingTest = []

    print('\nFormat Tests')
    passed = 0
    total = 0
    for entries, result in formatTests: 
        n = booleanExpression(entries)
        f = n.mathFormat()
        total+=1

        if result == f:
            #print(f"# {entries} : {'Passed'}")``
            passed += 1
        else:
            print(f"# {entries} : {'Failed'} \n")
            print(f'\t output: {f} , expected: {result}',)
    print(f'\nFormat Tests Passes: ({passed} / {total})\n')
    
    print('\nSimple Tests')
    passed = 0
    total = 0
    for entries, result in simpleTests: 
        n = booleanExpression(entries)
        f = n.simplify()
        total+=1

        if result == n.simplified:
            #print(f"# {entries} : {'Passed'}")``
            passed += 1
        else:
            print(f"# {entries} : {'Failed'} \n")
            print(f'\t output: {n.simplified} , expected: {result}',)
            print('\n\nSteps:')
            [print(x) for x in f]
            print('\n')
    print(f'\nSimple Tests Passed: ({passed} / {total})\n')

    passed = 0
    total = 0
    print('\nMorgan Tests\n')
    for entries, result in morganTests: 
        n = booleanExpression(entries)
        f = n.simplify()
        total+=1

        if result == n.simplified:
            #print(f"# {entries} : {'Passed'}")
            passed+=1
        else:
            # print(f"# {entries} : {'Failed'} \n")
            # print(f'\t output: {n.simplified} , expected: {result}',)
            # print('\n\nSteps:')
            # [print(x) for x in f]
            # print('\n')
            pass
    print(f'\nMorgan Tests Passed: ({passed} / {total})\n')
    
    passed = 0
    total = 0
    print('\nTheorems Tests\n')
    for entries, result in theoremTests: 
        n = booleanExpression(entries)
        f = n.simplify()
        total+=1

        if result == n.simplified:
            #print(f"# {entries} : {'Passed'}")
            passed+=1
        else:
            # print(f"# {entries} : {'Failed'} \n")
            # print(f'\t output: {n.simplified} , expected: {result}',)
            # print('\nSteps:')
            # [print(x) for x in f]
            # print()
            pass
    print(f'\nTheorems Tests Passed: ({passed} / {total})\n')

if __name__ == '__main__':
    booleanTesting()
    #a = booleanExpression('( !(a + c)!(b + d)*(ac + b) )')
    #b = a.simplify()
    #print()
    #c = [print(x) for x in b]





