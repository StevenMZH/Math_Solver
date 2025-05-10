from solvers.algebraic.equation import Ecuation

# In progress...
class ecuationSystem:

    def __init__(self, ecuations: list[Ecuation] ) -> None:
        self.ecuations = ecuations
        self.cuantity = len(ecuations)
