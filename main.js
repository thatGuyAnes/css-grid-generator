let columnsRange = document.querySelector('#columns');
let rowsRange = document.querySelector('#rows');
let gridContainer = document.querySelector('.grid-display');
let toggleBtn = document.querySelector('#toggle');
let sideBar = document.querySelector('.controls');
let controlsContent = document.querySelector('.controls-content');
let resetBtn = document.querySelector('.reset');
let defaultValues = {
    columns: 2,
    rows: 2,
    gap: '5px'
};
columnsRange.value = defaultValues.columns;
rowsRange.value = defaultValues.rows;
let currentValues = {
    columns: columnsRange.value,
    rows: rowsRange.value
};

// UPDATE COLUMNS EVENT.
columnsRange.addEventListener('change', () => updateColumns(columnsRange.value));

// COLUMN UPDATE HANDLER.
function updateColumns(newVal) {
    // If new value > current Value.
        if(newVal > currentValues.columns) {
            // update gridTemplate.
            gridContainer.style.gridTemplateColumns = `repeat(${newVal}, 1fr)`;
            // Append row number of boxes to the container.
            for(let i = 0; i < (newVal-currentValues.columns) * currentValues.rows; i++) {
                gridContainer.innerHTML += `<div class=\"box\" id=\"${gridContainer.childElementCount + 1}\"></div>`;
            }
            // update the current value with the new value.
            currentValues.columns = newVal;
    // If new value < current Value.
        } else if ( newVal < currentValues.columns ) {
            // update gridTemplate.
            gridContainer.style.gridTemplateColumns = `repeat(${newVal}, 1fr)`;
            // Remove row number of boxes from the container.
            for(let i = 0; i < (currentValues.columns - newVal)* currentValues.rows; i++) {
            gridContainer.removeChild(gridContainer.lastElementChild);
            }
            // update the current value with the new value.
            currentValues.columns = newVal;
        } else {
            return;
        }

}

// UPDATE ROWS EVENT.
rowsRange.addEventListener('change', () => updateRows(rowsRange.value));

// UPDATE ROW HANDLER.
function updateRows(newVal) {
    // If new value > current Value.
        if(newVal > currentValues.rows) {
            // update gridTemplate.
            gridContainer.style.gridTemplateRows = `repeat(${newVal}, 1fr)`;
            // Append row number of boxes to the container.
            for(let i = 0; i < (newVal-currentValues.rows) * currentValues.columns; i++) {
                gridContainer.innerHTML += `<div class=\"box\" id=\"${gridContainer.childElementCount + 1}\"></div>`;
            }
            // update the current value with the new value.
            currentValues.rows = newVal;
    // If new value < current Value.
        } else if ( newVal < currentValues.rows ) {
            // update gridTemplate.
            gridContainer.style.gridTemplateRows = `repeat(${newVal}, 1fr)`;
            // Remove row number of boxes from the container.
            for(let i = 0; i < (currentValues.rows - newVal)* currentValues.columns; i++) {
            gridContainer.removeChild(gridContainer.lastElementChild);
            }
            // update the current value with the new value.
            currentValues.rows = newVal;
        } 

}

// RESET BUTTON.
resetBtn.addEventListener('click', () => {
    gridContainer.innerHTML =`
    <div class=\"box\" id=\"1\"></div>
    <div class=\"box\" id=\"2\"></div>
    <div class=\"box\" id=\"3\"></div>
    <div class=\"box\" id=\"4\"></div>`;
    gridContainer.style.gridTemplateColumns = `repeat(${defaultValues.columns}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${defaultValues.rows}, 1fr)`;
    rowsRange.value = 2;
    columnsRange.value = 2;
    currentValues.rows = rowsRange.value;
    currentValues.columns = columnsRange.value;
});

let sideBarIsToggled = false;
// CLICKIN THE BUTTONS TOGGLE SIDEBAR.
toggleBtn.addEventListener('click', () => {
    sideBar.classList.toggle('collapsed');
    controlsContent.classList.toggle('collapsed');
    sideBarIsToggled = !sideBarIsToggled;
    for(let i = 0; i < toggleBtn.children.length; i++) {
        toggleBtn.children[i].classList.toggle('collapsed');
    }
});
// RESPONSIVE SIDEBAR TOGGELING.
window.onresize = function resizeListener() {
    console.log(sideBarIsToggled)
    if(document.body.clientWidth <= 800 && !sideBar.classList.contains('collapsed')) {
        // sideBarIsToggled = false;
        console.log('widht > 800')
        sideBar.classList.toggle('collapsed');
        controlsContent.classList.toggle('collapsed');
        for(let i = 0; i < toggleBtn.children.length; i++) {
            toggleBtn.children[i].classList.toggle('collapsed');
        }
    } else if (sideBar.classList.contains('collapsed') === true && document.body.clientWidth > 800 && sideBarIsToggled === true) {
        console.log('contains collapse', sideBar.classList.contains('collapsed'))
        sideBar.classList.toggle('collapsed');
        controlsContent.classList.toggle('collapsed');
        for(let i = 0; i < toggleBtn.children.length; i++) {
            toggleBtn.children[i].classList.toggle('collapsed');
        }
    } else {
        return ;
    }
}; 
