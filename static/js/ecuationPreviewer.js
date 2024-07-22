document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mathInput').addEventListener('input', function() {
        
        const input = this.value;
        document.getElementById('mathOutput').innerHTML = `\\(${input}\\)`;
        MathJax.typeset();
    });

});
