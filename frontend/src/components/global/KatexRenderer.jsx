import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // Asegúrate de importar los estilos de KaTeX

export function KatexRenderer ({ expression }) {
    let formattedExpression;

    try {
        formattedExpression = katex.renderToString(expression, {
            throwOnError: false, // Evita errores críticos en expresiones incorrectas
            displayMode: true,   // Modo de visualización (similar a bloque)
        });
    } catch (error) {
        console.error('Error al renderizar KaTeX:', error);
        formattedExpression = expression; // Retorna la expresión sin procesar si hay un error
    }

    return (
        <div
            className="katex-renderer text-title2"
            dangerouslySetInnerHTML={{ __html: formattedExpression }}
        />
    );
};

export default KatexRenderer;
