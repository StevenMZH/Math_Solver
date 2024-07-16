from basics.ecuations import Ecuation
from interpreter import inputInterpreter

if __name__ == '__main__':
    a = 'integrate(sin(10*x), x)'
    ec = Ecuation(a)
    print(f'\nInput: {a}\nTranlation:{inputInterpreter(a)[0]}\nBranches: {inputInterpreter(a)[1]} \n Solved: {ec.getSymplified()}\n')




