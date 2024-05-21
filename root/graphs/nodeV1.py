from copy import deepcopy

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
    
    def expantionTree_min(self):
        intersecs = []
        for n in self.nodes.values():
            for key, value in n.intersections.items():
                i1 = min(n.name, key)
                i2 = max(n.name, key)

                intersecs.append([i1, i2, value])
        
        intersecs = list(set([tuple(x) for x in intersecs]))
        print(intersecs)

        newIntersecs = []

        nodesQuantity = 1
        for n in range(nodesQuantity):
            branches = [x[2] for x in intersecs]


    def Dijkstra(self, startingNode:Node, destination:Node):

        # init pathData
        pathData = {}
        unExplored_Node = deepcopy(self.nodeNames)
        explored_Node = []   # {exploredNode_name: str, ...}

        for nodeName, node in (self.nodes.items()):
            # pathData[nodeName: str]: [previousNode: Node, accumulatedDistant: int/float]
            pathData[nodeName] = [None, float("inf")] # float("inf"): infinity


        # setting Starting Point
        pathData[startingNode.name] = [None, 0]  
        actualNode_name = startingNode.name


        # path calculation
        while(destination.name not in explored_Node):

            # iterating through every relation of the actualNode_name.
            for conectedNodeName, value in (self.nodes[actualNode_name].intersections).items():

                # Acummulated distant from going through the actualNode_name to the iterated node of his relations.
                newDistance = pathData[actualNode_name][1] + value  
                
                # if the newDistance is shorter than the previous assigned to the considered node of this iteration, update the path and distance to the new estimation.
                if(newDistance < pathData[conectedNodeName][1]):
                    pathData[conectedNodeName] = [actualNode_name, newDistance]

            if actualNode_name in unExplored_Node:
                unExplored_Node.remove(actualNode_name)
            if actualNode_name not in explored_Node:
                explored_Node.append(actualNode_name)
            if unExplored_Node:
                actualNode_name = min([(node, pathData[node][1]) for node in unExplored_Node], key=lambda x:x[1])[0]

        def getPath(path, node):
            if node is None:
                return 
            getPath(path, pathData[node][0])
            path.append(node)

        path = []
        getPath(path, destination.name)
        return path, pathData[destination.name][1]
        
    def Floyd(self):
        nodes = [[x if x != y else None for x in self.nodes] for y in self.nodes]
        values = [[self.getDistance(self.nodes[y], self.nodes[x]) if x != y else None for x in self.nodes] for y in self.nodes]
        
        def __transformTables(iter:int):
            nodesRow = nodes[iter]
            nodesColumn = [nodes[i][iter] for i in nodes]
            valuesRow = values[iter]
            valuesColumn = [nodes[i][iter] for i in values]

        print("\n\n")
        for i in nodes:
            for j in i:
                print("\t",j,end="")
            print("\n")
        print("\n\n")

        for i in values:
            for j in i:
                print("\t",j,end="")
            print("\n")
        print("\n\n")

    def maxFlow(self, root:Node, destination:Node):
        
        G2 = weightedGraph(self.nodes)
        G2.addIntersections([ [root, neighbord, value] for neighbord, value in root.intersections.items() ])

        # layer 0
        resourses = {root: 0}
        
        # layer 1
        for key, value in root.intersections.items():
            resourses[key] = value




    def printGraph(self):
        for node in (self.nodes).values():
            print(node.name, node.intersections)


'''
    def Dijkstra(self, startingNode:Node, destination:Node):
        # init pathData
        distances = {node: float('infinity') for node in self.nodeNames}
        previous_nodes = {node: None for node in self.nodeNames}
        distances[startingNode.name] = 0
        priority_queue = [(0, startingNode.name)]

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_distance > distances[current_node]:
                continue

            for neighbour, distance in self.nodes[current_node].intersections.items():
                distance = current_distance + distance

                if distance < distances[neighbour]:
                    distances[neighbour] = distance
                    previous_nodes[neighbour] = current_node
                    heapq.heappush(priority_queue, (distance, neighbour))

        path, current_node = [], destination.name
        while previous_nodes[current_node] is not None:
            path.insert(0, self.nodes[current_node])
            current_node = previous_nodes[current_node]
        path.insert(0, self.nodes[current_node])
        return path
'''

"""
LA = Node('LA')
SE = Node('SE')
DE = Node('DE')
DA = Node('DA')
CH = Node('CH')
NY = Node('NY')
DC = Node('DC')


g1 = weightedGraph({'LA':LA, 'SE':SE, 'DA':DA, 'DE':DE, 'CH':CH, 'NY':NY, 'DC':DC})

g1.addIntersections([['SE','LA', 1100], ['SE','DE', 1300], ['SE','CH', 2000]])
g1.addIntersections([['CH','DE', 1000],  ['CH','LA', 2000], ['CH','DA', 900], ['CH','NY', 800]])
g1.addIntersections([['DC','NY', 200], ['DC','LA', 2600], ['DC','DA', 1300]])
g1.addIntersections([['DA','LA', 1400], ['DA','DE', 780]])

g1.printGraph()
path = g1.Dijkstra("SE", "NY")

print(path)
"""

'''
A = Node("A")
B = Node("B")
C = Node("C")
D = Node("D")
E = Node("E")
F = Node("F")
G = Node("G")

G2 = weightedGraph([A, B, C, D, E, F, G])
G2.addIntersections( [[A, C, 3], [A, F, 2], [C, F, 2], [C, E, 4], [C, D, 4], [F, E, 3], [F, B, 6], [F, G, 5], [E, B, 2], [B, G, 2], [B, D, 1]] )
print("\n\n\n")
G2.printGraph()
G2.Floyd()
'''


