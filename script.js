const buttons = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input[type='color']");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
    inputs[index].click();
    });
});

inputs.forEach(input => {
    input.addEventListener("change", () => {
    const color = input.value;
    console.log(color);
    });
});