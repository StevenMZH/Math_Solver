

def prepConditional(p:str, q:str):
    return f' not ({p}) or {q} '

def prepBiconditional(p:str, q:str):
    return  f" ( {p}*{q} ) or ( not({p}) * not({q})) ) "
 
def booleanFormat(expression: str):
    meanings = {'+': ' or ', '*': ' and ', '^': ' and ', '~': ' not ', '!': ' not '}
    
    for c in meanings.keys():
        if(c in expression):
            expression.replace(c, meanings[c])



    





