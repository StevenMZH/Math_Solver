from .basics.mathFunctions import branches, funtionTranslation
from .basics.ecuations import Ecuation

# On progress...
def find_EdgeCases(input: str):
    if(input == ''):
        return 1
    return 0

def wordTranslater(input:str):
    for word in funtionTranslation.keys():
        if(word in input):
            input = input.replace(word,funtionTranslation[word])
    return input

def mathBranch_interpreter(input:str):    
    inputBranches = []
    for branch,funcs in branches.items():
        for f in funcs:
            if(f in input):
                inputBranches.append(branch)
    return inputBranches

def inputInterpreter(input:str):

    input = wordTranslater(input)
    branches = mathBranch_interpreter(input)
    return input, branches
    
# On progress...
def requestInterpreter(input:str, request:str):
    edgeCase = find_EdgeCases(input)
    
    if(edgeCase == 0):
        ec = Ecuation(wordTranslater(input))
        a = ec.getSymplified()
        return a
    return ''

