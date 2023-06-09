const gridContainer = document.querySelector('.grid-container');
const sliderValue = document.querySelector('.slider-value');
const containerStyle = getComputedStyle(gridContainer);



const inputs = document.querySelectorAll("input[type='color']");
const colorValue = document.querySelectorAll(".color-value")
const colorOverlay = document.querySelectorAll(".color-overlay")
const colorContent = document.querySelectorAll(".content");


inputs.forEach((input, index) => {
    input.addEventListener("change", () => {
        const color = input.value;
        if (index === 0) {
            itemForeground = color;
            colorValue[index].innerText = color;
        } else if (index === 1) {
            itemBackground = color;
            colorValue[index].innerText = color;
        }
        colorOverlay[index].style.backgroundColor = color;
        setTextColor(colorContent[index], colorValue[index], color);
    });
});



function grid() {
    let size = 24;
    sliderValue.innerHTML = `24 x 24`;
    let itemForeground = '#000000';
    let itemBackground = '#ffffff';

    const slider = document.querySelector('.slider');
    slider.addEventListener('input', () => {
        size = parseInt(slider.value);
        sliderValue.innerHTML = `${size} x ${size}`;
        const value = (size - slider.min) / (slider.max - slider.min);
        const percentage = value * 100;
        slider.style.background = `linear-gradient(to right, #6db3f6 0%, #6db3f6 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
    });

    

    gridContainer.innerHTML = '';
    // console.log(size);
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        gridContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            const item = document.createElement("div");
            item.classList.add('item');
            item.style.height = `${parseInt(containerStyle.height) / size}px`;
            item.style.width = `${parseInt(containerStyle.height) / size}px`;
            item.style.backgroundColor = itemBackground;
            item.style.borderBottom = '1px solid rgb(156, 156, 156)';
            item.style.borderRight = '1px solid rgb(156, 156, 156)';
            item.style.boxSizing = 'border-box';
            row.appendChild(item);

            toggle(item);

            let isMouseDown = false;
            item.addEventListener('mousedown', () => {
                isMouseDown = true;
                item.style.backgroundColor = itemForeground;
            })
            item.addEventListener('mousedown', () => {
                isMouseDown = false;
            })
            item.addEventListener('mouseenter', () => {
                if (isMouseDown) {
                    item.style.backgroundColor = itemForeground;
                }

            })

        }
    }
}




grid()





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


function toggle(item){
    const toggleInput = document.querySelector('.toggle-input');
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