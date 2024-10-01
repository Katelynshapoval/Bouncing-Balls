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
  isCollisionBall(ballArray);
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
  let randomXSpreed = randomInt(-5, 5);
  let randomYSpreed = randomInt(-5, 5);
  let newBall = new Ball(
    randomX,
    randomY,
    formData.pickSize,
    randomXSpreed,
    randomYSpreed,
    formData.pickColor
  );
  ballArray.push(newBall);
}

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
