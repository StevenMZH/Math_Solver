function downloadSVG() {
    var svg = document.getElementById("graph-svg");
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    // Añadir el espacio de nombres XML si está ausente
    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    // Añadir doctype XML
    if (!source.match(/^<\?xml/)) {
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    }

    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    var link = document.createElement("a");
    link.href = url;
    link.download = "graph.svg";
    link.click();
}

function downloadPNG() {
    var svg = document.getElementById("graph-svg");
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    // Crear un canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.onload = function() {
        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;
        ctx.drawImage(img, 0, 0);

        var link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "graph.png";
        link.click();
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
}

document.addEventListener('DOMContentLoaded', function() {
    // Open panel by button
    document.getElementById('algorithms_Button').addEventListener('click', function() {
        document.getElementById('algorithmPanel').style.display = 'flex';
    });

    // Botón para cerrar el panel
    document.getElementById('closePanel_Button_algorithm').addEventListener('click', function() {
        document.getElementById('algorithmPanel').style.display = 'none';
    });

    // Botones de algoritmo dentro del panel
    document.querySelectorAll('.algorithmButton').forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para aplicar el algoritmo seleccionado
            console.log('Algorithm selected:', button.textContent);
            document.getElementById('algorithmPanel').style.display = 'none';
        });
    });


    // Botón para mostrar el panel
    document.getElementById('download_Button').addEventListener('click', function() {
        document.getElementById('downloadPanel').style.display = 'flex';
    });

    // Botón para cerrar el panel
    document.getElementById('closePanel_Button_download').addEventListener('click', function() {
        document.getElementById('downloadPanel').style.display = 'none';
    });

    document.getElementById('downloadSVG_Button').addEventListener('click', downloadSVG);
    document.getElementById('downloadPNG_Button').addEventListener('click', downloadPNG);
});
