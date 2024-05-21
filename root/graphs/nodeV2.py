
class Node:

    def __init__(self, name:str):
        self.name = name
        self.intersections = {} # {destinationNode.name: str, weightValue: int/float}

class weightedGraph:

    def __init__(self, nodes:list):
        self.nodes = {node.name:node for node in nodes}
        self.nodeNames = []

        for name, node in (self.nodes.items()):
            self.nodeNames.append(name)

        self.numbeOfNodes = len(self.nodeNames)

    def addIntersection(self, node1:Node, node2:Node, value):
        if (node1.name not in self.nodeNames) or (node2.name not in self.nodeNames):
            return

        node1.intersections[node2.name] = value
        node2.intersections[node1.name] = value

    def addIntersections(self, intersecctions:list):
        for i in intersecctions:
            self.addIntersection(i[0], i[1], i[2])

    def add_Unidirectional_Intersection(self, root:Node, destination:Node, value):
        if (root.name not in self.nodeNames) or (destination.name not in self.nodeNames):
            return 

        root.intersections[destination.name] = value

    def add_Unidirectional_Intersections(self, intersecctions:list):
        for i in intersecctions:
            self.add_Unidirectional_Intersection(i[0], i[1], i[2])

    def removeIntersection(self, node1: str, node2: str):
        if node1 in self.nodes and node2 in self.nodes[node1].intersections:
            del self.nodes[node1].intersections[node2]
        if node2 in self.nodes and node1 in self.nodes[node2].intersections:
            del self.nodes[node2].intersections[node1]


    def getDistance(self, home:Node, destination:Node) -> float:
        if( isinstance(home, Node) and isinstance(destination, Node) and (home != destination) ):
            if destination.name in self.nodes[home.name].intersections:
                return self.nodes[home.name].intersections[destination.name]
            else:
                return float('inf')  # return "infinity" if there's no direct path
        else:
            return None
    