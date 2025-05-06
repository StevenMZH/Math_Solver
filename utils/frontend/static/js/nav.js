document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces de menú que pueden activar submenús
    const toggles = document.querySelectorAll('.menu-toggle');

    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Evitar redireccionar
            // Cerrar otros submenús
            toggles.forEach(function(item) {
                if (item !== toggle) {
                    item.classList.remove('active');
                    item.nextElementSibling.style.display = 'none';
                }
            });
            
            // Alternar visibilidad del submenú actual
            const submenu = toggle.nextElementSibling;
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
                toggle.classList.remove('active');
            } else {
                submenu.style.display = 'block';
                toggle.classList.add('active');
            }
        });
    });
});
