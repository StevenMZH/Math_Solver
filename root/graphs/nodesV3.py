import networkx as nx
import matplotlib.pyplot as plt

class wNode:
    def __init__(self, name:str):
        self.name = name
        self.intersections = {} # 

class uwNode:
    def __init__(self, name:str):
        self.name = name
        self.intersections = []

class unweightedGraph:
    def __init__(self, nodes:list ):
        self.nodeNames = {node.name:node for node in nodes}
        self.nodes = nodes
        self.nodeCounter = len(nodes)
        self.names = [node.name for node in self.nodes]

    def addIntersection(self, node1:uwNode, node2:uwNode):
        node1.intersections.append(node2)
        node2.intersections.append(node1)

    def addUnidirectional_Intersection(self, root:uwNode, destination:uwNode):
        root.intersections.append(destination)

    def addIntersections(self, nodes:list):
        for intersec in nodes:
            self.addIntersection(intersec[0], intersec[1])

    def addUnidirectional_Intersections(self, nodes:list):
        for intersec in nodes:
            self.addUnidirectional_Intersection(intersec[0], intersec[1])


    def removeIntersection(self, node1: uwNode, node2: uwNode):
        if node1.name in self.nodeNames and node2.name in self.nodeNames:
            if node2 in node1.intersections:
                node1.intersections.remove(node2)
            if node1 in node2.intersections:
                node2.intersections.remove(node1)

    def removeNode(self, node: uwNode):
        if node.name in self.nodeNames:
            del self.nodeNames[node.name]  
            self.nodes.remove(node) 
            for n in self.nodes: 
                if node in n.intersections:
                    n.intersections.remove(node)
            self.names = [node.name for node in self.nodes] 

    def draw(self):
        G = nx.DiGraph()  # Utilizamos un grafo dirigido para que las flechas sean unidireccionales

        # Agregar nodos al grafo
        for node in self.nodes:
            G.add_node(node.name)

        # Agregar arcos bidireccionales al grafo
        for node in self.nodes:
            for intersection in node.intersections:
                G.add_edge(node.name, intersection.name)  # Arcos bidireccionales

        # Agregar arcos unidireccionales al grafo con flechas
        unidirectional_edges = [(node.name, intersection.name) for node in self.nodes for intersection in node.intersections if node in intersection.intersections]

        # Dibujar el grafo
        pos = nx.spring_layout(G)
        nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold')

        # Dibujar arcos bidireccionales
        nx.draw_networkx_edges(G, pos, edgelist=G.edges(), style='solid', arrows=False)

        # Dibujar arcos unidireccionales con flechas
        nx.draw_networkx_edges(G, pos, edgelist=unidirectional_edges, style='dashed', arrows=True)

        plt.show()


class weightedGraph:
    def __init__(self, nodes:list ):
        self.nodeNames = {node.name:node for node in nodes}
        self.nodes = nodes
        self.nodeCounter = len(nodes)
        self.names = [node.name for node in self.nodes]

    def addIntersection(self, node1:uwNode, node2:uwNode):
        node1.intersections.append(node2)
        node2.intersections.append(node1)

    def addUnidirectional_Intersection(self, root:uwNode, destination:uwNode):
        root.intersections.append(destination)

    def addIntersections(self, nodes:list):
        for intersec in nodes:
            self.addIntersection(intersec[0], intersec[1])

    def addUnidirectional_Intersections(self, nodes:list):
        for intersec in nodes:
            self.addUnidirectional_Intersection(intersec[0], intersec[1])


    def removeIntersection(self, node1: uwNode, node2: uwNode):
        if node1.name in self.nodeNames and node2.name in self.nodeNames:
            if node2 in node1.intersections:
                node1.intersections.remove(node2)
            if node1 in node2.intersections:
                node2.intersections.remove(node1)

    def removeNode(self, node: uwNode):
        if node.name in self.nodeNames:
            del self.nodeNames[node.name]  
            self.nodes.remove(node) 
            for n in self.nodes: 
                if node in n.intersections:
                    n.intersections.remove(node)
            self.names = [node.name for node in self.nodes] 

    def draw(self):
        G = nx.DiGraph()  # Utilizamos un grafo dirigido para que las flechas sean unidireccionales

        # Agregar nodos al grafo
        for node in self.nodes:
            G.add_node(node.name)

        # Agregar arcos bidireccionales al grafo
        for node in self.nodes:
            for intersection in node.intersections:
                G.add_edge(node.name, intersection.name)  # Arcos bidireccionales

        # Agregar arcos unidireccionales al grafo con flechas
        unidirectional_edges = [(node.name, intersection.name) for node in self.nodes for intersection in node.intersections if node in intersection.intersections]

        # Dibujar el grafo
        pos = nx.spring_layout(G)
        nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold')

        # Dibujar arcos bidireccionales
        nx.draw_networkx_edges(G, pos, edgelist=G.edges(), style='solid', arrows=False)

        # Dibujar arcos unidireccionales con flechas
        nx.draw_networkx_edges(G, pos, edgelist=unidirectional_edges, style='dashed', arrows=True)

        plt.show()


N1 = uwNode('N1')
N2 = uwNode('N2')
N3 = uwNode('N3')
N4 = uwNode('N4')

G1 = unweightedGraph([N1,N2,N3,N4])
G1.addIntersection(N1,N2)
G1.addIntersections([[N2, N3], [N3,N4], [N2, N2]])
G1.addUnidirectional_Intersections([[N1, N3], [N1,N4]])

G1.draw()