document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('paletteSelector').addEventListener('input', function() {
        var selectedValue = this.value;
        console.log('Selected theme:', selectedValue);

        document.body.classList.remove('palette1','palette2','palette3');
        document.body.classList.add(selectedValue);
    });
});
