import { updateGraphSize } from './graphSim.js';

document.addEventListener('DOMContentLoaded', function() {

    updateGraphSize("#graphSolver-svg");
});

window.addEventListener('resize', function() {
    updateGraphSize("#graphSolver-svg");
});

