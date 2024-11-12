document.addEventListener("DOMContentLoaded", () => {
    const codeEditor = document.getElementById('code-editor');
    const output = document.getElementById('output');

    // Añade manejador de entrada (input) para el primer textarea
    const initialTextarea = codeEditor.querySelector('.codeContent');
    initialTextarea.addEventListener('input', updateOutput);

    // Manejador de teclas en el editor
    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Previene el comportamiento por defecto
            insertNewCodeLine();
        }
    });

    // Función para insertar una nueva línea de código (codeLine)
    function insertNewCodeLine() {
        const codeLineCount = codeEditor.querySelectorAll('.codeLine').length;
        
        // Crea una nueva estructura de línea
        const newCodeLine = document.createElement('div');
        newCodeLine.classList.add('codeLine');

        const newLineNumber = document.createElement('div');
        newLineNumber.classList.add('codeNumber');
        newLineNumber.textContent = codeLineCount + 1;

        const newCodeContentContainer = document.createElement('div');
        newCodeContentContainer.classList.add('codeContent-container');

        const newTextarea = document.createElement('textarea');
        newTextarea.classList.add('codeContent');
        newTextarea.addEventListener('input', updateOutput); // Actualiza la salida en tiempo real

        newCodeContentContainer.appendChild(newTextarea);
        newCodeLine.appendChild(newLineNumber);
        newCodeLine.appendChild(newCodeContentContainer);

        codeEditor.appendChild(newCodeLine); // Añade la nueva línea de código
        newTextarea.focus(); // Enfoca el nuevo textarea
    }

    // Función para actualizar la salida en tiempo real
    function updateOutput() {
        let codeContent = '';
        const textareas = codeEditor.querySelectorAll('.codeContent');
        textareas.forEach(textarea => {
            codeContent += textarea.value + '\n';
        });
        output.innerText = codeContent.trim(); // Actualiza el contenido del output
    }
});
