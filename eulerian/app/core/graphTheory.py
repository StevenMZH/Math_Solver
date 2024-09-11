import heapq
import matplotlib.pyplot as plt
import networkx as nx

class Node:
    """
    Represents a node in a graph.

    Attributes:
    ----------
    id : str
        The identifier of the node.
    link : dict
        Dictionary where the key is the target node's ID and the value is the weight of the link.
    """

    def __init__(self, id: str) -> None:
        """
        Initializes a Node with an ID.

        Parameters:
        ----------
        id : str
            The identifier of the node.
        """
        self.id = id
        self.link = {}  


class Graph:
    """
    Represents a graph consisting of nodes and links between them.

    Attributes:
    ----------
    nodes : dict
        A dictionary of Node objects indexed by their IDs.
    nodesID : list
        A list of node IDs.
    numberOfNodes : int
        The total number of nodes in the graph.
    weighted : bool
        Indicates if the graph is weighted or not.

    Methods:
    -------
    add_Link(root: Node, target: Node, weight: str, bidirectional: bool = False) -> None:
        Adds a directed link between two nodes with an optional weight.

    add_Links(links: list[list]) -> None:
        Adds multiple links to the graph.

    removeNode(node: Node) -> None:
        Removes a node and its associated links from the graph.

    removeLink(root: str, target: str, bidirectional: bool = False) -> None:
        Removes a link between two nodes.

    get_linkWeight(root: Node, target: Node) -> str:
        Retrieves the weight of the link between two nodes.

    toDict() -> dict:
        Converts the graph structure to a dictionary format.

    localDraw() -> None:
        Visualizes the graph using Matplotlib.
    """

    def __init__(self, nodes: list, weighted: bool = True) -> None:
        """
        Initializes the graph with a list of nodes and indicates if it's weighted.

        Parameters:
        ----------
        nodes : list
            List of Node objects to be included in the graph.
        weighted : bool, optional
            Indicates if the graph is weighted (default is True).
        """
        self.nodes = {node.id: node for node in nodes}
        self.nodesID = [node.id for node in nodes]
        self.numberOfNodes = len(self.nodesID)
        self.weighted = weighted   

    def add_Link(self, root: Node, target: Node, weight: str, bidirectional: bool = False) -> None:
        """
        Adds a directed link between two nodes with an optional weight.
        
        Parameters:
        ----------
        root : Node
            The starting node of the link.
        target : Node
            The target node of the link.
        weight : str
            The weight of the link.
        bidirectional : bool, optional
            If True, adds a link in the opposite direction as well (default is False).
        """

        if (root.id not in self.nodesID) or (target.id not in self.nodesID):
            return 
        root.link[target.id] = weight
        if bidirectional:
            target.link[root.id] = weight

    def add_Links(self, links: list[list]) -> None:
        """
        Adds multiple links to the graph.

        Parameters:
        ----------
        links : list[list]
            A list of links where each link is represented as [root, target, weight, bidirectional].
        """
        for link in links:
            root = link[0]
            target = link[1]
            value = link[2]
            bidirectional = link[3] if len(link) > 3 else False
            self.add_Link(root, target, value, bidirectional)

    def removeNode(self, node: Node) -> None:
        """
        Removes a node and all associated links from the graph.

        Parameters:
        ----------
        node : Node
            The node to be removed from the graph.
        """
        if node.id in self.nodes:
            del self.nodes[node.id]
            for n in self.nodes.values():
                if node.id in n.link:
                    del n.link[node.id]
            self.nodesID.remove(node.id)

    def removeLink(self, root: str, target: str, bidirectional: bool = False) -> None:
        """
        Removes a directed link between two nodes.

        Parameters:
        ----------
        root : str
            The ID of the starting node of the link.
        target : str
            The ID of the target node of the link.
        bidirectional : bool, optional
            If True, removes the link in the opposite direction as well (default is False).
        """
        if root in self.nodes and target in self.nodes[root].link:
            del self.nodes[root].link[target]

        if bidirectional and target in self.nodes and root in self.nodes[target].link:
            del self.nodes[target].link[root]

    def get_linkWeight(self, root: Node, target: Node) -> str:
        """
        Retrieves the weight of the link between two nodes.

        Parameters:
        ----------
        root : Node
            The starting node of the link.
        target : Node
            The target node of the link.

        Returns:
        -------
        str
            The weight of the link, or None if no link exists.
        """
        if isinstance(root, Node) and isinstance(target, Node) and (root != target):
            if target.id in self.nodes[root.id].link:
                return self.nodes[root.id].link[target.id]
        return None
    
    def toDict(self) -> dict:
        """
        Converts the graph structure to a dictionary format.

        Returns:
        -------
        dict
            A dictionary representing the graph, including nodes and links.
        """
        result = {}
        result['nodes'] = self.nodesID
        links = []
        for node_id, node in self.nodes.items():
            for target_id, weight in node.link.items():
                if self.weighted:
                    links.append([node_id, target_id, weight])
                else:
                    links.append([node_id, target_id, ''])
        result['links'] = links
        result['weighted'] = self.weighted
        return result

    def localDraw(self) -> None:
        """
        Visualizes the graph using Matplotlib.

        Draws the graph with nodes and links, and labels for the weights if the graph is weighted.
        """
        G = nx.DiGraph()  # Utilizamos un grafo dirigido para que las flechas sean unidireccionales

        # Agregar nodos al grafo
        for node_id, node in self.nodes.items():
            G.add_node(node_id)

        # Agregar arcos al grafo con etiquetas de texto
        for node_id, node in self.nodes.items():
            for target_id, weight in node.link.items():
                if self.weighted:
                    G.add_edge(node_id, target_id, weight=weight)
                else:
                    G.add_edge(node_id, target_id)

        # Identificar enlaces bidireccionales con el mismo peso
        edges_to_merge = []
        for node_id, node in self.nodes.items():
            for target_id in node.link.keys():
                if (target_id in self.nodes and node_id in self.nodes[target_id].link
                        and node.link[target_id] == self.nodes[target_id].link[node_id]):
                    if (target_id, node_id) not in edges_to_merge:
                        edges_to_merge.append((node_id, target_id))

        # Dibujar el grafo
        pos = nx.spring_layout(G)  # Posiciones para todos los nodos
        nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=1500, font_size=12, font_weight='bold')

        # Dibujar etiquetas de arcos
        if self.weighted:
            labels = nx.get_edge_attributes(G, 'weight')
            nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)

        # Ajustar enlaces bidireccionales con el mismo peso
        for edge in edges_to_merge:
            if self.weighted:
                G.edges[edge]['weight'] = f"{G.edges[edge]['weight']} (bidirectional)"
            G.remove_edge(edge[1], edge[0])
            nx.draw_networkx_edges(G, pos, edgelist=[edge], arrowstyle='<|-|>', arrowsize=20)

        plt.show()


def Dijkstra(graph: Graph, root: Node, target: Node) -> tuple[float, list]:
    """
    Implements Dijkstra's algorithm to find the shortest path in a graph.

    Parameters:
    ----------
    graph : Graph
        The graph on which to run Dijkstra's algorithm.
    root : Node
        The starting node of the path.
    target : Node
        The target node for which the shortest path is sought.

    Returns:
    -------
    tuple[float, list]
        A tuple containing the shortest distance and the path as a list of node IDs.
    """

    distances = {node_id: float('inf') for node_id in graph.nodesID}
    predecessors = {node_id: None for node_id in graph.nodesID}
    distances[root.id] = 0

    priority_queue = [(0, root.id)]
    heapq.heapify(priority_queue)

    while priority_queue:
        current_distance, current_node_id = heapq.heappop(priority_queue)

        if current_node_id == target.id:
            path = []
            while current_node_id is not None:
                path.insert(0, current_node_id)
                current_node_id = predecessors[current_node_id]
            return distances[target.id], path

        if current_distance > distances[current_node_id]:
            continue

        for neighbor_id, weight in graph.nodes[current_node_id].link.items():
            distance = current_distance + int(weight)
            if distance < distances[neighbor_id]:
                distances[neighbor_id] = distance
                predecessors[neighbor_id] = current_node_id
                heapq.heappush(priority_queue, (distance, neighbor_id))

    return float('inf'), []


if __name__ == '__main__':
    """
    # Creación de nodos
    q1 = Node('q1')
    q2 = Node('q2')
    q3 = Node('q3')

    # Creación del grafo ponderado
    G2 = Graph([q1, q2, q3])

    # Agregar transiciones al grafo
    G2.add_Links([ [q1, q2, 3], [q2, q1, 2], [q1, q3, 1, True], [q2, q3, 4] ])
    print(Dijkstra(G2, q2, q3))
    print(G2.toDict())
    # Dibujar el grafo
    G2.localDraw()
    """