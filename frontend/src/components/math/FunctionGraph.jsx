import { useEffect } from 'react';

const FunctionGraph = () => {
  useEffect(() => {
    // Crear el script para cargar GeoGebra
    const script = document.createElement('script');
    script.src = 'https://www.geogebra.org/apps/deployggb.js';
    script.onload = () => {
      const app = new window.GGBApplet({
        "appName": "graphing", // Usamos "graphing" para graficar funciones
        "width": 1000,
        "height": 600,
        "showToolBar": true,  // Ocultar barra de herramientas
        "showAlgebraInput": true,  // Ocultar campo de entrada algebraica
        "showMenuBar": false,  // Ocultar menú
        "showResetIcon": false,  // Ocultar icono de reset
        "showZoomButtons": false,  // Ocultar botones de zoom
        "allowStyleBar": true,  // Ocultar la barra de estilo
        "enableRightClick": true,  // Desactivar clic derecho
        "sidebarPosition": "none",  // Ocultar la barra lateral
        "useBrowserForJS": true,  // Permite usar evalCommand con el navegador
      }, true);
      
      // Inyecta el gráfico en el div con id 'geogebra-container'
      app.inject('geogebra-container');

      // Asegurarse de que las funciones se evalúen después de que el applet se cargue completamente
      app.onUpdate = () => {
        app.evalCommand('f(x) = sin(x)');
        app.evalCommand('SetColor(f, "blue")');
      };
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: Eliminar el script cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="geogebra-container" style={{ border: '1px solid #ccc'}}></div>
  );
};

export default FunctionGraph;
