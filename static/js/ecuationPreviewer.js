document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mathInput').addEventListener('input', function() {
        const input = this.value;
        const mathExpression = convertToMathExpression(input);
        document.getElementById('mathOutput').innerHTML = `\\(${mathExpression}\\)`;
        MathJax.typeset();
    });

    function convertToMathExpression(input) {
        // Replace 'integral(' with '\int'
        let expression = input.replace(/integral\(/g, '\\int ');
        // Replace ')' with ''
        expression = expression.replace(/\)/g, '');
        return expression;
    }
});
