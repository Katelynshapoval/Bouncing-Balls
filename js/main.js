import Ball from "./Ball.js";
const form = document.querySelector("form");

const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let initialBall;
let ballArray = [];

function setup() {
  canvas.width = options.width;
  canvas.height = options.height;
  initialBall = new Ball(100, 100, 50, 2, 2, "#fff");
  ballArray.push(initialBall);
  requestAnimationFrame(loop);
}

// Events
window.addEventListener("load", setup);

function update() {
  //   ball.update(ctx);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update(ctx);
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].draw(ctx);
  }
}
function loop() {
  update();
  draw();
  //   debug();
  requestAnimationFrame(loop);
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent HTML refresh
  const formData = new FormData(form); // Converts to array of arrays
  const obj = Object.fromEntries(formData); // Array of arrays to object
  console.log(obj);
  createBall(obj);
});

// Helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function createBall(formData) {
  let randomX = randomInt(100, 400);
  let randomY = randomInt(100, 400);
  let newBall = new Ball(
    randomX,
    randomY,
    formData.pickSize,
    2,
    2,
    formData.pickColor
  );
  ballArray.push(newBall);
}
