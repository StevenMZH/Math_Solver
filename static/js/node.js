function drawGraph() {
    // Datos del grafo (ejemplo, puedes reemplazar esto con tus datos reales)
    var nodes = [
        { id: 1, label: 'Start' },
        { id: 2, label: 'A' },
        { id: 3, label: 'New' },
        { id: 4, label: 'Graph' }
    ];

    var links = [
        { source: 1, target: 2, weight: 0 },
        { source: 2, target: 3, weight: 0 },
        { source: 3, target: 4, weight: 0 }
    ];

    var width = 600;
    var height = 300;
    var nodesRadius = 10;
    var nodesDistance = 50;
    var strenghtRepulsion = -1000;

    // Crear el lienzo SVG
    var svg = d3.select("#graph-svg")
                .attr("width", width)
                .attr("height", height);

    // Definir la simulación de fuerza para el grafo
    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(nodesDistance)) // Ajustar la distancia entre nodos aquí
        .force("charge", d3.forceManyBody().strength(strenghtRepulsion))
        .force("center", d3.forceCenter(width / 2, height / 2));

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

        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

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

// Llamar a la función para dibujar el grafo cuando se cargue la página
document.addEventListener('DOMContentLoaded', drawGraph);