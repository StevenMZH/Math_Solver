document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paletteSelector').addEventListener('input', function() {
        var selectedValue = this.value;
        console.log('Selected theme:', selectedValue);

        // Eliminar todas las clases de tema del body
        document.body.classList.remove('palette1','palette2','palette3');
        
        // Agregar la clase seleccionada al body
        document.body.classList.add(selectedValue);
    });
});
