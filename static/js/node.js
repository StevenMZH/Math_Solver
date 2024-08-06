function drawGraph(width, height, nodes, links) {
    var nodesRadius = 10;
    var nodesDistance = 50;
    var strengthRepulsion = -1000;

    // Crear el lienzo SVG
    var svg = d3.select("#graph-svg")
                .attr("width", width)
                .attr("height", height);

    // Definir la simulación de fuerza para el grafo
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(nodesDistance)) // Ajustar la distancia entre nodos aquí
        .force("charge", d3.forceManyBody().strength(strengthRepulsion))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX().strength(0.1).x(width / 2)) // Fuerza hacia el centro en el eje X
        .force("y", d3.forceY().strength(0.1).y(height / 2)); // Fuerza hacia el centro en el eje Y

    // Crear los enlaces
    var link = svg.selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link");

    // Crear las etiquetas de los enlaces
    var linkLabels = svg.selectAll(".link-label")
        .data(links)
        .enter().append("text")
        .attr("class", "link-label")
        .text(d => d.weight);

    // Crear los nodos
    var node = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", nodesRadius) // Ajustar el tamaño de los nodos aquí
        .call(d3.drag() // Habilitar arrastre para los nodos
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Agregar etiquetas a los nodos
    var label = svg.selectAll(".node-label")
        .data(nodes)
        .enter()
        .append('text')
        .attr('class', 'node-label')
        .text(d => d.label);

    // Actualizar posición de nodos y enlaces en cada iteración de la simulación
    simulation.on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        linkLabels.attr("x", d => (d.source.x + d.target.x) / 2)
                  .attr("y", d => (d.source.y + d.target.y) / 2 - 5); // Desplazar etiqueta de enlace

        node.attr("cx", d => d.x = Math.max(nodesRadius, Math.min(width - nodesRadius, d.x)))
            .attr("cy", d => d.y = Math.max(nodesRadius, Math.min(height - nodesRadius, d.y)));

        label.attr('x', d => d.x + 15) // Desplazar etiqueta de nodo en x
            .attr('y', d => d.y + 5); // Desplazar etiqueta de nodo en y
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function updateGraphSize() {
    var width = window.innerWidth * 0.7;
    var height = window.innerHeight * 0.6;
    const nodes = JSON.parse(localStorage.getItem('nodes')) || [
        { id: 1, label: 'Start' },
        { id: 2, label: 'A' },
        { id: 3, label: 'New' },
        { id: 4, label: 'Graph' }
    ];
    const links = JSON.parse(localStorage.getItem('links')) || [
        { source: 1, target: 2, weight: 0 },
        { source: 2, target: 3, weight: 0 },
        { source: 3, target: 4, weight: 0 }
    ];
    drawGraph(width, height, nodes, links);
}


function addNodeIfNotExist(nodes, label) {
    let node = nodes.find(n => n.label === label);
    if (!node) {
        const id = nodes.length > 0 ? nodes[nodes.length - 1].id + 1 : 1;
        node = { id, label };
        nodes.push(node);
    }
    return node;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('newNode_Button').addEventListener('click', function() {
        var nodes = JSON.parse(localStorage.getItem('nodes')) || [];
        var last_nodeId = nodes.length > 0 ? nodes[nodes.length - 1].id : 0;
        
        var newNode_id = last_nodeId + 1;
        var newNode_name = document.getElementById('newNode').value;
        var newNode = { id: newNode_id, label: newNode_name };
        nodes.push(newNode);

        localStorage.setItem('nodes', JSON.stringify(nodes));
        updateGraphSize();
    });

    document.getElementById('newIntersection_Button').addEventListener('click', function() {
        var nodes = JSON.parse(localStorage.getItem('nodes')) || [];
        var links = JSON.parse(localStorage.getItem('links')) || [];

        var sourceLabel = document.getElementById('newNode_source').value;
        var targetLabel = document.getElementById('newNode_target').value;
        var weight = parseInt(document.getElementById('newNode_weight').value);

        var sourceNode = addNodeIfNotExist(nodes, sourceLabel);
        var targetNode = addNodeIfNotExist(nodes, targetLabel);

        var newLink = { source: sourceNode.id, target: targetNode.id, weight };
        links.push(newLink);

        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('links', JSON.stringify(links));
        updateGraphSize();
    });

    document.getElementById('clear_Button').addEventListener('click', function() {
        localStorage.setItem('nodes', JSON.stringify([]));
        localStorage.setItem('links', JSON.stringify([]));
        updateGraphSize();
    });

    updateGraphSize();
});

window.addEventListener('resize', updateGraphSize);