import networkx as nx
import matplotlib.pyplot as plt

from nodesV3 import uwNode, unweightedGraph
from nodeV2 import Node, weightedGraph

import networkx as nx
import matplotlib.pyplot as plt

def draw_weighted_graph(graph: weightedGraph):
    G = nx.Graph()

    for node_name, node in graph.nodes.items():
        G.add_node(node_name)

    for node_name, node in graph.nodes.items():
        for destination, weight in node.intersections.items():
            G.add_edge(node_name, destination, weight=weight)

    pos = nx.spring_layout(G)
    labels = nx.get_edge_attributes(G, 'weight')
    nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold', arrowsize=20)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)

    plt.show()

def draw_unweighted_graph(graph: unweightedGraph):
    G = nx.Graph()

    for nodeName, node in graph.nodeNames.items():
        G.add_node(nodeName)

    for nodeName, node in graph.nodeNames.items():
        for destination in node.intersections:
            G.add_edge(nodeName, destination)

    pos = nx.spring_layout(G)
    labels = nx.get_edge_attributes(G, 'weight')
    nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold', arrowsize=20)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)

    plt.show()

'''
N1 = uwNode('N1')
N2 = uwNode('N2')
N3 = uwNode('N3')
N4 = uwNode('N4')

G1 = unweightedGraph([N1,N2,N3,N4])
G1.addIntersection(N1,N2)
G1.addIntersections([[N2, N3], [N3,N4]])
G1.removeIntersection(N2, N3)


A1 = Node("A1")
A2 = Node("A2")


G1 = weightedGraph([A1,A2])

G1.add_Unidirectional_Intersections([ [A1, A1, 3], [A1, A2, 4]])


draw_weighted_graph(G1)
'''
