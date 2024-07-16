const width = 800;
const height = 600;

const svg = d3.select("#diagram").append("svg")
    .attr("width", width)
    .attr("height", height);

const data = {
    nodes: [
        { id: "A" },
        { id: "B" },
        { id: "C" },
        { id: "D" }
    ],
    links: [
        { source: "A", target: "B" },
        { source: "A", target: "C" },
        { source: "B", target: "D" }
    ]
};

const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", "node");

node.append("circle")
    .attr("r", 10);

node.append("text")
    .text(d => d.id)
    .attr("x", 12)
    .attr("y", 3);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
});
