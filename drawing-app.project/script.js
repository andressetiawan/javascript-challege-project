const canvas = document.body.querySelector("canvas");
const increasedEl = document.body.querySelector("#increased");
const decreasedEl = document.body.querySelector("#decresaed");
const weightEl = document.body.querySelector("#weight");
const clearEl = document.body.querySelector("#clear");
const colorPickerEl = document.body.querySelector("#colorPicker");

let weightVal = parseInt(weightEl.value);
let color = "black";

const ctx = canvas.getContext("2d");

let coordinate = {
  x: undefined,
  y: undefined,
  x1: undefined,
  x2: undefined,
};

let isClicked = false;

colorPickerEl.addEventListener("change", (e) => {
  color = e.target.value;
});

const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, weightVal, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

const drawLine = (x, y, x1, y1) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.strokeStyle = color;
  ctx.lineWidth = weightVal * 2;
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  coordinate.x = e.offsetX;
  coordinate.y = e.offsetY;
  isClicked = true;
  drawCircle(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (isClicked) {
    drawLine(coordinate.x, coordinate.y, e.offsetX, e.offsetY);
    drawCircle(e.offsetX, e.offsetY);
    coordinate.x = e.offsetX;
    coordinate.y = e.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isClicked = false;
  coordinate = {
    x: undefined,
    y: undefined,
    x1: undefined,
    x2: undefined,
  };
});

increasedEl.addEventListener("click", () => {
  if (weightVal !== 20) {
    weightVal += 5;
    weightEl.setAttribute("value", weightVal);
  }
});

decreasedEl.addEventListener("click", () => {
  if (weightVal !== 5) {
    weightVal -= 5;
    weightEl.setAttribute("value", weightVal);
  }
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, 500, 300);
});
