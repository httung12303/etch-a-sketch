const COLOR_MODE = 1;
const RAINBOW_MODE = 2;
const ERASE_MODE = 3;

let mouseDown = false;
let mode = COLOR_MODE;

const body = document.querySelector('body');
const rangeInput = document.querySelector('input[type="range"]');
const colorInput = document.querySelector('input[type="color"]');
const colorModeButton = document.querySelector('#color-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');
const eraseButton = document.querySelector('#erase');
const clearButton = document.querySelector('#clear');
const sizeLabel = document.querySelector('label[for="grid-size"]');
const buttons = document.querySelectorAll('button');

addGridDivs(16);

buttons.forEach(button => button.addEventListener('click', selectedButton));
body.addEventListener('mouseup', () => mouseDown = false);
rangeInput.addEventListener('change', () => {
    const size = rangeInput.value;
    sizeLabel.textContent = `${size} x ${size}`;
    addGridDivs(size);
});
colorModeButton.addEventListener('click', () => mode = COLOR_MODE);
rainbowModeButton.addEventListener('click', () => mode = RAINBOW_MODE);
eraseButton.addEventListener('click', () => mode = ERASE_MODE);
clearButton.addEventListener('click', clearGrid);

function selectedButton(event) {
    buttons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
}
function changeCellColor(event) {
    if(event.type === 'mousedown') mouseDown = true;
    if(!mouseDown) return;
    let color;
    switch(mode) {
        case COLOR_MODE:
            color = colorInput.value;
            break;
        case ERASE_MODE:
            color = 'white';
            break;
        case RAINBOW_MODE:
            color = `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`;
            break;
    }
    event.target.style.backgroundColor = color;
}
function addGridDivs(size) {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for(let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        grid.appendChild(div);
    }
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => gridItem.addEventListener('mouseover', changeCellColor));
    gridItems.forEach(gridItem => gridItem.addEventListener('mousedown', changeCellColor));
}
function randomNumber(range) {
    return Math.floor(Math.random() * range);
}
function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => gridItem.style.backgroundColor = 'white');
}