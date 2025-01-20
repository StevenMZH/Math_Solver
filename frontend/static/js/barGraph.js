document.addEventListener('DOMContentLoaded', (event) => {
    const barGraphContainer = document.getElementById('barGraph');
    const sortAlgorithmSelect = document.getElementById('sortingAlgorithm-selector');
    const numBarsInput = document.getElementById('numBars');
    const animationSpeedInput = document.getElementById('sortingAlgorithm-speed');
    const speedValueSpan = document.getElementById('speedValue');
    
    let bars = [];
    let animationSpeed = parseInt(animationSpeedInput.value);
    let isSorting = false;

    function generateBars(num = 20) {
        barGraphContainer.innerHTML = '';
        bars = [];
        for (let i = 0; i < num; i++) {
            const barHeight = Math.floor(Math.random() * 170) + 20;
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${barHeight}px`;
            barGraphContainer.appendChild(bar);
            bars.push(bar);
        }
        markSorted(false); // Asegúrate de limpiar el estado de ordenamiento
    }

    function highlightBars(i, j) {
        bars[i].classList.add('compare');
        bars[j].classList.add('compare');
    }

    function unhighlightBars(i, j) {
        bars[i].classList.remove('compare');
        bars[j].classList.remove('compare');
    }

    function swapHighlightBars(i, j) {
        bars[i].classList.add('swap');
        bars[j].classList.add('swap');
    }

    function unhighlightSwapBars(i, j) {
        bars[i].classList.remove('swap');
        bars[j].classList.remove('swap');
    }

    function markSorted(isSorted) {
        bars.forEach(bar => {
            if (isSorted) {
                bar.classList.add('sorted');
                bar.classList.remove('compare', 'swap');
            } else {
                bar.classList.remove('sorted');
            }
        });
    }

    async function bubbleSort() {
        isSorting = true;
        const n = bars.length;
        const iterationTime = animationSpeed; // Tiempo total para una iteración completa

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!isSorting) return; // Detener si se presiona Reset
                highlightBars(j, j + 1);
                await pauseAnimation(iterationTime / 2); // Tiempo para comparación
                if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                    swapHighlightBars(j, j + 1);
                    await swapBars(j, j + 1); // Tiempo para swap incluido en el tiempo total
                    unhighlightSwapBars(j, j + 1);
                }
                unhighlightBars(j, j + 1);
            }
        }
        markSorted(true);
        isSorting = false;
    }

    async function selectionSort() {
        isSorting = true;
        const n = bars.length;
        const iterationTime = animationSpeed; // Tiempo total para una iteración completa

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (!isSorting) return; // Detener si se presiona Reset
                highlightBars(j, minIdx);
                await pauseAnimation(iterationTime / 2); // Tiempo para comparación
                if (parseInt(bars[j].style.height) < parseInt(bars[minIdx].style.height)) {
                    minIdx = j;
                }
                unhighlightBars(j, minIdx);
            }
            if (minIdx !== i) {
                swapHighlightBars(i, minIdx);
                await swapBars(i, minIdx); // Tiempo para swap incluido en el tiempo total
                unhighlightSwapBars(i, minIdx);
            }
        }
        markSorted(true);
        isSorting = false;
    }

    async function insertionSort() {
        isSorting = true;
        const n = bars.length;
        const iterationTime = animationSpeed; // Tiempo total para una iteración completa

        for (let i = 1; i < n; i++) {
            let j = i;
            while (j > 0 && parseInt(bars[j].style.height) < parseInt(bars[j - 1].style.height)) {
                if (!isSorting) return; // Detener si se presiona Reset
                highlightBars(j, j - 1);
                await swapBars(j, j - 1); // Tiempo para swap incluido en el tiempo total
                unhighlightBars(j, j - 1);
                j--;
            }
            await pauseAnimation(iterationTime / 2); // Tiempo restante para completar la iteración
        }
        markSorted(true);
        isSorting = false;
    }

    function swapBars(i, j) {
        return new Promise((resolve) => {
            const tempHeight = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = tempHeight;
            setTimeout(() => {
                resolve();
            }, animationSpeed / 2); // Tiempo para swap
        });
    }

    function pauseAnimation(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    function updateBars() {
        if (!isSorting) {
            const numBars = parseInt(numBarsInput.value);
            generateBars(numBars);
        }
    }

    function updateSpeed() {
        animationSpeed = parseInt(animationSpeedInput.value);
        speedValueSpan.textContent = `${animationSpeed} ms`;
    }

    function resetBars() {
        if (!isSorting) {
            updateBars();
        } else {
            isSorting = false; // Cancelar el ordenamiento actual
        }
    }

    function sortBars() {
        if (isSorting) return; // No permitir ordenar si ya está en curso
        const algorithm = sortAlgorithmSelect.value;
        if (algorithm === 'bubbleSort') {
            bubbleSort();
        } else if (algorithm === 'selectionSort') {
            selectionSort();
        } else if (algorithm === 'insertionSort') {
            insertionSort();
        }
        // Añade más condiciones para otros algoritmos
    }

    // Inicializar el gráfico de barras al cargar la página
    generateBars(parseInt(numBarsInput.value));
    updateSpeed();  // Inicializa la velocidad de animación

    // Exponer funciones globales
    window.bubbleSort = bubbleSort;
    window.selectionSort = selectionSort;
    window.insertionSort = insertionSort;
    window.sortBars = sortBars;
    window.resetBars = resetBars;
    window.updateBars = updateBars;
    window.updateSpeed = updateSpeed;
});
