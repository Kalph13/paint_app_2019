const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

/* Option 1: getElementByClassName (HTMLCollection) → Array.from (Array) → forEach */
/* forEach is not available on HTMLCollection */
const colors_html = document.getElementsByClassName("controls_color");

/* Option 2: querySelectorAll (NodeList) → forEach */
/* forEach is available on NodeList and Array */
/* const colors_node = document.querySelectorAll(".controls_color"); */

/* Option 3: getElementByClassName (HTMLCollection) → for */
/* Not Working → Perhaps addEventListner is not available on HTMLCollection */
/* const colors_html = document.getElementsByClassName("controls_color"); */

canvas.width = 700;
canvas.height = 700;

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

context.strokeStyle = "#2c2c2c";
context.lineWidth = 2.5;

let onPainting = false;
let onFilling = false;

const startPainting = () => {
    onPainting = true;
};

const stopPainting = () => {
    onPainting = false;
};

const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!onPainting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
};

const onClick = () => {
    if (onFilling) context.fillRect(0, 0, canvas.width, canvas.height)
};

const onContextMenu = (event) => {
    event.preventDefault();
}

const onSave = () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
};

const changeColor = (event) => {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
};

const changeRange = (event) => {
    const lineWidth = event.target.value;
    context.lineWidth = lineWidth;
}

const changeMode = () => {
    if (!onFilling) mode.innerText = "Paint";
    else mode.innerText = "Fill";
    onFilling = !onFilling;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", onClick);
canvas.addEventListener("contextmenu", onContextMenu);

/* Option 1: getElementByClassName (HTMLCollection) → Array.from (Array) → forEach */
/* forEach is not available on HTMLCollection */
Array.from(colors_html).forEach((color) => addEventListener("click", changeColor));

/* Option 2: querySelectorAll (NodeList) → forEach */
/* forEach is available on NodeList and Array */
/* colors_node.forEach((color) => color.addEventListener("click", changeColor)); */

/* Option 3: getElementByClassName (HTMLCollection) → for */
/* Not Working → Perhaps addEventListner is not available on HTMLCollection */
/* for (let i = 0; i < colors_html.length; i++) {
    colors_html[i].addEventListener("click", changeColor);
} */

range.addEventListener("input", changeRange);
mode.addEventListener("click", changeMode);
save.addEventListener("click", onSave);