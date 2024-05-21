from copy import deepcopy

from nodeV2 import Node, weightedGraph

def expantionTree_min(graph):
    pass

def Dijkstra(graph:weightedGraph , startingNode:Node, destination:Node):

    # init pathData
    pathData = {}
    unExplored_Node = deepcopy(graph.nodeNames)
    explored_Node = []   # {exploredNode_name: str, ...}

    for nodeName, node in (graph.nodes.items()):
        # pathData[nodeName: str]: [previousNode: Node, accumulatedDistant: int/float]
        pathData[nodeName] = [None, float("inf")] # float("inf"): infinity


    # setting Starting Point
    pathData[startingNode.name] = [None, 0]  
    actualNode_name = startingNode.name


    # path calculation
    while(destination.name not in explored_Node):

        # iterating through every relation of the actualNode_name.
        for conectedNodeName, value in (graph.nodes[actualNode_name].intersections).items():

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
        
def Floyd(graph):
    pass

def maxFlow(graph, root:Node, destination:Node):
    pass

