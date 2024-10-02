import Ball from "./Ball.js";

// Grabbing DOM elements
let form = document.getElementById("menu");
let formBall = document.getElementById("formBall");
let addButton = document.getElementById("add");
let clearButton = document.getElementById("clear");
let backgroundForm = document.getElementById("backgroundForm");

let ballArray = []; // Array to store balls

// Clears all balls when the "Clear" button is clicked
clearButton.addEventListener("click", () => {
  ballArray = [];
});

// Handles form submission for changing background color and creating balls
backgroundForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(backgroundForm);
  const obj = Object.fromEntries(formData);
  console.log(obj);
  createBall(obj);
});

// Toggles form visibility when the "Add" button is clicked
addButton.addEventListener("click", () => {
  let display = form.style.display !== "flex" ? "flex" : "none";
  addButton.innerText = display === "flex" ? "Close" : "Edit";
  form.style.display = display;
});

// Canvas setup
const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Sets canvas dimensions and starts the animation loop
function setup() {
  canvas.width = options.width;
  canvas.height = options.height;
  requestAnimationFrame(loop);
}

// Events
window.addEventListener("load", setup);

// Updates the state of all balls and checks for collisions
function update() {
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update(ctx);
  }
  isCollisionBall(ballArray);
}

// Clears the canvas and draws all balls
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].draw(ctx);
  }
}

// Main animation loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Handles ball creation form submission
formBall.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formBall);
  const obj = Object.fromEntries(formData);
  createBall(obj);
});

// Helper functions for random number generation
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Creates a new ball and adds it to the ball array
function createBall(formData) {
  canvas.style.backgroundColor = formData.backgroundColor;
  if (ballArray.length > 70) {
    alert("You can't create any more balls.");
    return;
  }
  let randomX = randomInt(80, window.innerWidth - 100);
  let randomY = randomInt(80, window.innerHeight - 100);
  let randomXSpreed = randomInt(-7, 7);
  let randomYSpreed = randomInt(-7, 7);
  let newBall = new Ball(
    randomX,
    randomY,
    formData.pickSize,
    randomXSpreed,
    randomYSpreed,
    formData.ballColor
  );
  ballArray.push(newBall);
}

// Checks and resolves ball collisions
function isCollisionBall(balls) {
  for (let b1 = 0; b1 < balls.length; b1++) {
    for (let b2 = b1 + 1; b2 < balls.length; b2++) {
      let ball1 = balls[b1];
      let ball2 = balls[b2];

      // Calculate the distance between the two balls' centers
      let dx = ball1.x - ball2.x;
      let dy = ball1.y - ball2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the distance is less than or equal to the sum of their radii (collision)
      if (distance <= ball1.radius + ball2.radius) {
        // Calculate the angle of the collision
        let angle = Math.atan2(dy, dx);

        // Calculate the total overlap
        let overlap = (ball1.radius + ball2.radius - distance) / 2;

        // Move balls apart to avoid them getting stuck inside each other
        ball1.x += Math.cos(angle) * overlap;
        ball1.y += Math.sin(angle) * overlap;

        ball2.x -= Math.cos(angle) * overlap;
        ball2.y -= Math.sin(angle) * overlap;

        // Calculate new velocities based on collision
        let v1x = ball1.vx - ball2.vx;
        let v1y = ball1.vy - ball2.vy;

        // Apply velocity changes only in the collision direction
        let dotProduct = v1x * Math.cos(angle) + v1y * Math.sin(angle);
        ball1.vx -= dotProduct * Math.cos(angle);
        ball1.vy -= dotProduct * Math.sin(angle);

        ball2.vx += dotProduct * Math.cos(angle);
        ball2.vy += dotProduct * Math.sin(angle);
      }
    }
  }
}
