import networkx as nx
import matplotlib.pyplot as plt

class Node:
    def __init__(self, name:str):
        self.name = name
        self.intersections = {}  # {destinationNode.name: str}

class weightedGraph:

    def __init__(self, nodes:list):
        self.nodes = {node.name: node for node in nodes}
        self.nodeNames = [node.name for node in nodes]
        self.numbeOfNodes = len(self.nodeNames)

    def add_Unidirectional_Intersection(self, root:Node, destination:Node, value:str):
        if (root.name not in self.nodeNames) or (destination.name not in self.nodeNames):
            return 

        root.intersections[destination.name] = value

    def add_Unidirectional_Intersections(self, intersections:list):
        for i in intersections:
            self.add_Unidirectional_Intersection(i[0], i[1], i[2])

    def removeIntersection(self, node1: str, node2: str):
        if node1 in self.nodes and node2 in self.nodes[node1].intersections:
            del self.nodes[node1].intersections[node2]

    def getDistance(self, home:Node, destination:Node) -> str:
        if isinstance(home, Node) and isinstance(destination, Node) and (home != destination):
            if destination.name in self.nodes[home.name].intersections:
                return self.nodes[home.name].intersections[destination.name]
            else:
                return None  # Return "None" if there's no direct path
        else:
            return None
    
    def draw(self):
        G = nx.DiGraph()  # Utilizamos un grafo dirigido para que las flechas sean unidireccionales

        # Agregar nodos al grafo
        for node_name, node in self.nodes.items():
            G.add_node(node_name)

        # Agregar arcos al grafo con etiquetas de texto
        for node_name, node in self.nodes.items():
            for intersection_name, label in node.intersections.items():
                G.add_edge(node_name, intersection_name, label=label)

        # Dibujar el grafo
        pos = nx.spring_layout(G)  # Posiciones para todos los nodos
        nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold')
        labels = nx.get_edge_attributes(G, 'label')
        nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)

        plt.show()

# Creación de nodos
q1 = Node('q1')
q2 = Node('q2')
q3 = Node('q3')
q4 = Node('q4')
t = Node('t')


# Creación del grafo ponderado
G2 = weightedGraph([q1, q2, q3, q4, t])

# Agregar transiciones basadas en el autómata finito proporcionado
# Formato: nodo_origen, nodo_destino, etiqueta
transitions = [
    [q1, q4, '0'], [q1, q2, '1'],
    [q2, t, '0'], [q2, q4, '1'],
    [q3, q4, 0], [q3, q2, ' 1'],
    [q4, q4, '0'], [q4, q4, '1'], 
    [t, q3, '0']
]

# Agregar transiciones al grafo
G2.add_Unidirectional_Intersections(transitions)

# Dibujar el grafo
G2.draw()