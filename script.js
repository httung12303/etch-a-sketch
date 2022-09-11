addGridDivs(16);

const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => gridItem.addEventListener('mouseenter', changeColor));


function changeColor() {
    this.style.backgroundColor = 'pink';
    console.log(this);
}

function addGridDivs(size) {
    const grid = document.querySelector('.grid');
    for(let i = 0; i < size * size; i++) {
        const divContainer = document.createElement('div');
        divContainer.classList.add('grid-item-container');
        const div = document.createElement('div');
        div.classList.add('grid-item');
        divContainer.appendChild(div);
        grid.appendChild(divContainer);
    }
}