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

});
