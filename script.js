const inputs = document.querySelectorAll("input[type='color']");
const colorValue = document.querySelectorAll(".color-value")
const colorOverlay = document.querySelectorAll(".color-overlay")
const colorContent = document.querySelectorAll(".content");
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
const gridContainer = document.querySelector(".grid-container");
const containerStyle = getComputedStyle(gridContainer);

sliderValue.innerHTML = `24 x 24`;
grid(24)

inputs.forEach((input, index) => {
    input.addEventListener("change", () => {
        const color = input.value;
        colorValue[index].innerText = color;
        colorOverlay[index].style.backgroundColor = color;
        setTextColor(colorContent[index], colorValue[index], color);
    });
});

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

slider.addEventListener('input', () => {
    grid(slider.value);
    sliderValue.innerHTML = `${slider.value} x ${slider.value}`;

    const value = (slider.value - slider.min) / (slider.max - slider.min);
    const percentage = value * 100;
    slider.style.background = `linear-gradient(to right, #6db3f6 0%, #6db3f6 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
});

function grid(size =24){
    gridContainer.innerHTML='';
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        gridContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            const item = document.createElement("div");
            item.style.height = `${parseInt(containerStyle.height) / size}px`;
            item.style.width = `${parseInt(containerStyle.height) / size}px`;
            row.appendChild(item);
            item.style.backgroundColor = '#555555';
            item.style.borderBottom = '1px solid white';
            item.style.borderRight = '1px solid white';
            item.style.boxSizing = 'border-box';
        }
    }
}