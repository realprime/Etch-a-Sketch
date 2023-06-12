//slider
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
//color inputs
const inputs = document.querySelectorAll("input[type='color']");
const colorValue = document.querySelectorAll(".color-value")
const colorOverlay = document.querySelectorAll(".color-overlay")
const colorContent = document.querySelectorAll(".content");
//border line toggle
const toggleInput = document.querySelector('.toggle-input');
//grid
const gridContainer = document.querySelector('.grid-container');
const containerStyle = getComputedStyle(gridContainer);
const items = document.querySelectorAll('.gridItem');
//toggle buttons
const buttons = document.querySelectorAll('.toggle-button')
//each toggle button
const eraserBtn = document.querySelector('#eraser');
const pencilBtn = document.querySelector('#pencil');
const rainbowBtn = document.querySelector('#rainbow');
const darkenBtn = document.querySelector('#darken');
const lightenBtn = document.querySelector('#lighten');

let eraser = false;
let pencil = false;
let rainbow = false;
let darken = false;
let lighten = false;

sliderValue.innerHTML = `24 x 24`;
var itemForeground = '#000000';
var itemBackground = '#ffffff';
grid();



function grid() {
    var size = 24;

    slider.addEventListener('input', () => {
        size = parseInt(slider.value);
        sliderValue.innerHTML = `${size} x ${size}`;
        const value = (size - slider.min) / (slider.max - slider.min);
        const percentage = value * 100;
        slider.style.background = `linear-gradient(to right, #6db3f6 0%, #6db3f6 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;

        // Regenerate the grid with the updated size
        generateGrid(size);
        toggleInput.checked = false;
    });

    // Generate the initial grid
    generateGrid(size);
}

function generateGrid(size) {
    gridContainer.innerHTML = '';

    inputColors();

    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        gridContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            const item = document.createElement('div');
            item.classList.add('gridItem');
            item.style.height = `${parseInt(containerStyle.height) / size}px`;
            item.style.width = `${parseInt(containerStyle.height) / size}px`;
            inputColors();
            // item.style.backgroundColor = itemBackground;
            item.style.borderBottom = '1px solid rgb(156, 156, 156)';
            item.style.borderRight = '1px solid rgb(156, 156, 156)';
            item.style.boxSizing = 'border-box';
            row.appendChild(item);

            toggle(item);

            pencilBtn.classList.add('focused');
            pencil = false;

            item.addEventListener('mousedown', () => {
                // item.setAttribute('data-shade','10');
                item.style.backgroundColor = itemForeground;
            });
            

            item.addEventListener('mousedown',draw);

            clear(item)
        }
    }
}

function clear(item){
    const clear = document.querySelector('.clear');

    clear.addEventListener('click', () => {
        item.style.backgroundColor = '';
    })
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('focused');
    })
})

eraserBtn.addEventListener('click', () => {
    if(eraser){
        eraser = false;
    } else {
        eraser = true;
        pencil = false;
        pencilBtn.classList.remove('focused');
        rainbow = false;
        rainbowBtn.classList.remove('focused');
        darken = false;
        darkenBtn.classList.remove('focused');
        lighten = false;
        lightenBtn.classList.remove('focused');
    }
})

pencilBtn.addEventListener('click', () => {
    if(pencil){
        pencil = false;
    } else {
        pencil = true;
        eraser = false;
        eraserBtn.classList.remove('focused');
        rainbow = false;
        rainbowBtn.classList.remove('focused');
        darken = false;
        darkenBtn.classList.remove('focused');
        lighten = false;
        lightenBtn.classList.remove('focused');
    }
})

rainbowBtn.addEventListener('click', () => {
    if(rainbow){
        rainbow = false;
    } else {
        rainbow = true;
        eraser = false;
        eraserBtn.classList.remove('focused');
        pencil = false;
        pencilBtn.classList.remove('focused');
        darken = false;
        darkenBtn.classList.remove('focused');
        lighten = false;
        lightenBtn.classList.remove('focused');
    }
})

darkenBtn.addEventListener('click', () => {
    if(darken){
        darken = false;
    } else {
        darken = true;
        eraser = false;
        eraserBtn.classList.remove('focused');
        pencil = false;
        pencilBtn.classList.remove('focused');
        rainbow = false;
        rainbowBtn.classList.remove('focused');
        lighten = false;
        lightenBtn.classList.remove('focused');
    }
})

lightenBtn.addEventListener('click', () => {
    if(lighten){
        lighten = false;
    } else {
        lighten = true;
        eraser = false;
        eraserBtn.classList.remove('focused');
        pencil = false;
        pencilBtn.classList.remove('focused');
        rainbow = false;
        rainbowBtn.classList.remove('focused');
        darken = false;
        darkenBtn.classList.remove('focused');
    }
})


function draw(e){
    if(eraser){
        e.target.style.backgroundColor = '';
    } else if(rainbow){
        e.target.style.backgroundColor = `rgb(${randomNum()},${randomNum()},${randomNum()})`
        e.target.setAttribute('data-shade','10');
    } else if(darken) {
        if(!e.target.dataset.shade){
            e.target.setAttribute('data-shade','1');
        } else {
            let shadeStrength = parseInt(e.target.getAttribute('data-shade'));
            shadeStrength++; 
            e.target.setAttribute('data-shade',`${shadeStrength}`);
        }
        let shadeStrength = parseInt(e.target.getAttribute('data-shade'));
        console.log(shadeStrength);
        e.target.style.backgroundColor = increShading(itemForeground,shadeStrength);
    } else if(lighten) {
        if(e.target.dataset.shade){
            let shadeStrength = parseInt(e.target.getAttribute('data-shade'));
            shadeStrength--; 
            e.target.setAttribute('data-shade',`${shadeStrength}`);
        }
        let shadeStrength = parseInt(e.target.getAttribute('data-shade'));
        console.log(shadeStrength);
        e.target.style.backgroundColor = decreShading(itemForeground,shadeStrength);
    }
}


function decreShading(color, amount) {
    const [red, green, blue] = getRGBValues(color);
    console.log(color);
    let factoredAmount = amount/10;
    if (factoredAmount < 0) {
        factoredAmount = 0;
    }
    result = `rgba(${red}, ${green}, ${blue}, ${factoredAmount})`
    console.log(result)
    return result;
}
    

function increShading(color, amount) {
    let factoredAmount = amount/10;
    const [red, green, blue] = getRGBValues(color);
    if (factoredAmount > 1) {
        factoredAmount = 1;
    }
    result = `rgba(${red}, ${green}, ${blue}, ${factoredAmount})`
    console.log(result)
    return result;
}



function toggle(item){
    toggleInput.addEventListener('change', () => {
        if(toggleInput.checked){
            item.style.borderBottom = '';
            item.style.borderRight = '';
        } else {
            item.style.borderBottom = '1px solid rgb(156, 156, 156)';
            item.style.borderRight = '1px solid rgb(156, 156, 156)';
        } 
    })
}


function inputColors(){
    if(colorValue.length > 0){
        inputs.forEach((input, index) => {
            input.addEventListener("change", () => {
                const color = input.value;
                if (index === 0) {
                    itemForeground = color;
                    //console.log(itemForeground);
                    colorValue[index].innerText = itemForeground;
                } else if (index === 1) {
                    itemBackground = color;
                    // console.log(itemBackground);
                    colorValue[index].innerText = color;
                    updateBgColor(color);
                }
                colorOverlay[index].style.backgroundColor = color;
                setTextColor(colorContent[index], colorValue[index], color);
            });
        });
    }
}

function updateBgColor(color){
    gridContainer.style.setProperty("--item-background", color);
}


function setTextColor(content, colorInput, backgroundColor) {
    const colorBrightness = calculateColorBrightness(backgroundColor);
    const textColor = colorBrightness > 125 ? 'black' : 'white';
    colorInput.style.color = textColor;
    content.style.color = textColor;
}

function calculateColorBrightness(color) {
    const [red, green, blue] = getRGBValues(color);
    return (red * 299 + green * 587 + blue * 114) / 1000;
}

function getRGBValues(color) {
    const hex = color.substring(1);
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    return [red, green, blue];
}

function randomNum(){
    return Math.floor(Math.random()*256);
}