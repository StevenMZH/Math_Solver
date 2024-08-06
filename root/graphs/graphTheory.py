import matplotlib.pyplot as plt
import networkx as nx


class Node:
    def __init__(self, id: str, links: dict = {}) -> None:
        self.id = id
        self.links = links

class Graph:
    def __init__(self, nodes: list[Node | str], weighted: bool = True) -> None:
        self.nodes = nodes
        if isinstance(nodes[0], str):
            self.nodes = []
            self.nodes = [Node(n) for n in nodes]
        self.weighted = weighted

    def addLink(self, root: Node, target: Node, value: str, bidirectional: bool = True) -> None:
        if root == target:
            print("Error: Cannot add self-loop")
            return

        root.links[target] = value
        if bidirectional:
            target.links[root] = value

    def addLinks(self, newLinks: list[list]) -> None:
        for newLink in newLinks:
            self.addLink(newLink[0], newLink[1], newLink[2], newLink[3])

    def removeNode(self, node: Node) -> None:
        if node in self.nodes:
            self.nodes.remove(node)
            for n in self.nodes:
                if node in n.links.keys():
                    del n.links[node]
            return
        print("Error: Node not found")

    def removeLink(self, root: Node, target: Node, bidirectional: bool = True) -> None:
        if root in self.nodes and target in self.nodes:
            if target in root.links.keys():
                del root.links[target]
            if bidirectional and root in target.links.keys():
                del target.links[root]
            return
        print("Error: Node not found")

    def get_linkWeight(self, root: Node, target: Node) -> None:
        if root in self.nodes and target in self.nodes:
            return root.links.get(target, None)
        return None

    def tostring(self):
        for node in self.nodes:
            rootID = node.id
            for target, value in node.links.items():
                if target in self.nodes:  # Ensure the target is a valid node
                    targetID = target.id
                    print(f"{rootID} , {targetID}, {value}")

    def localDraw(self) -> None:
        G = nx.DiGraph() if self.weighted else nx.Graph()
        
        # Add nodes to the graph
        for node in self.nodes:
            G.add_node(node.id)
        
        # Add edges to the graph
        for node in self.nodes:
            for target, weight in node.links.items():
                if self.weighted:
                    G.add_edge(node.id, target.id, weight=float(weight))
                else:
                    G.add_edge(node.id, target.id)
        
        pos = nx.spring_layout(G)  # Positioning of nodes
        
        nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=500, font_size=10, font_weight='bold', arrows=True, connectionstyle='arc3,rad=0.1')

        if self.weighted:
            edge_labels = {(node.id, target.id): weight for node in self.nodes for target, weight in node.links.items() if (node.id, target.id) in G.edges}
            nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels)

        plt.show()


def dijkstra(graph: Graph, start: Node, target: Node) -> tuple[list, float]:
    # Distances dictionary
    distances = {node: float('inf') for node in graph.nodes}
    distances[start] = 0
    
    # Previous nodes dictionary
    previous_nodes = {node: None for node in graph.nodes}
    
    # Unvisited nodes set
    unvisited_nodes = set(graph.nodes)
    
    while unvisited_nodes:
        # Select the unvisited node with the smallest distance
        current_node = min(unvisited_nodes, key=lambda node: distances[node])
        
        # If the smallest distance is infinity, the remaining nodes are unreachable
        if distances[current_node] == float('inf'):
            break
        
        # Remove the node from unvisited set
        unvisited_nodes.remove(current_node)
        
        # Check if we reached the target node
        if current_node == target:
            break
        
        for neighbor, weight in current_node.links.items():
            distance = distances[current_node] + float(weight)
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous_nodes[neighbor] = current_node
    
    # Reconstruct path
    path = []
    node = target
    while node is not None:
        path.append(node)
        node = previous_nodes[node]
    
    path.reverse()
    
    # Check if the path contains the target node
    if path and path[0] == start:
        return path, distances[target]
    else:
        return [], float('inf')  # No path found

# Ejemplo de uso
A = Node('A')
B = Node('B')
C = Node('C')
D = Node('D')
nodes = [A, B, C, D] 
graph = Graph(nodes, weighted=True)
graph.addLink(A, B, '1', False)
graph.tostring()
graph.localDraw()
