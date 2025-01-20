document.addEventListener("DOMContentLoaded", function () {
    const addItemButton = document.getElementById("append"); 
    const listContainer = document.getElementById("list-container");
    const appendButton = document.getElementById("appendButton");
    const insertButton = document.getElementById("insertButton");
    const popButton = document.getElementById("popButton");
    const searchButton = document.getElementById("searchButton");
    const sortButton = document.getElementById("sortButton");
    const clearButton = document.getElementById("clearButton");

    // Función para agregar un nuevo recuadro vacío
    function addNewItem(value = "") {
        const newItem = document.createElement("div");
        newItem.classList.add("list-item");

        const newInput = document.createElement("input");
        newInput.type = "text";
        newInput.classList.add("list-input");
        newInput.value = value;
        newInput.placeholder = "Ø";
        newInput.pattern = "[0-9]*";

        newItem.appendChild(newInput);
        listContainer.appendChild(newItem);
    }

    // Agregar un elemento automáticamente al cargar la página
    addNewItem();

    addItemButton.addEventListener("click", function () {
        addNewItem();
    });

    // Evento para agregar un nuevo recuadro al hacer clic en el botón "Append"
    appendButton.addEventListener("click", function () {
        const value = document.getElementById("appendInput").value;
        if (value) {
            addNewItem(value);
        }
    });

    // Evento para insertar un nuevo recuadro en un índice específico
    insertButton.addEventListener("click", function () {
        const index = parseInt(document.getElementById("insertIndex").value);
        const value = document.getElementById("insertInput").value;
        const items = listContainer.children;

        if (index >= 0 && index <= items.length) {
            const newItem = document.createElement("div");
            newItem.classList.add("list-item");

            const newInput = document.createElement("input");
            newInput.type = "text";
            newInput.classList.add("list-input");
            newInput.value = value;
            newInput.placeholder = "Ø";
            newInput.pattern = "[0-9]*";

            newItem.appendChild(newInput);
            listContainer.insertBefore(newItem, items[index]);
        }
    });

    // Evento para eliminar un recuadro en un índice específico
    popButton.addEventListener("click", function () {
        const index = parseInt(document.getElementById("popIndex").value);
        const items = listContainer.children;

        if (index >= 0 && index < items.length) {
            listContainer.removeChild(items[index]);
        }
    });

    // Evento para buscar un valor en la lista
    searchButton.addEventListener("click", function () {
        const value = document.getElementById("searchInput").value;
        const items = listContainer.children;
        let found = false;

        Array.from(items).forEach((item, index) => {
            item.classList.remove("highlight"); // Limpiar cualquier resaltado previo
            if (item.querySelector("input").value === value) {
                item.classList.add("highlight");
                found = true;
            }
        });

        if (!found) {
            alert("Valor no encontrado");
        }
    });

    // Evento para ordenar los valores en la lista
    sortButton.addEventListener("click", function () {
        const itemsArray = Array.from(listContainer.children);

        itemsArray.sort((a, b) => {
            const valueA = parseInt(a.querySelector("input").value);
            const valueB = parseInt(b.querySelector("input").value);
            return valueA - valueB;
        });

        listContainer.innerHTML = "";
        itemsArray.forEach(item => listContainer.appendChild(item));
    });

    // Evento para borrar todos los elementos de la lista
    clearButton.addEventListener("click", function () {
        listContainer.innerHTML = "";
    });
});



