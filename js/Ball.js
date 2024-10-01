// Options to dynamically set the canvas dimensions and handle window resizing
const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Update the options when the window is resized
window.addEventListener("resize", () => {
  options.width = window.innerWidth;
  options.height = window.innerHeight;
});

export default class Ball {
  // Constructor to initialize ball properties
  constructor(x, y, size, vx, vy, colour) {
    this.x = x;
    this.y = y;
    this.radius = size / 2; // Radius is half the size
    this.vx = vx;
    this.vy = vy;
    this.colour = colour;
  }

  // Update ball position and handle boundary collisions
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Handle horizontal boundary collisions
    if (this.x - this.radius < 0) {
      this.x = this.radius; // Correct position if it goes out of bounds
      this.vx *= -1; // Reverse velocity
    } else if (this.x + this.radius > options.width) {
      this.x = options.width - this.radius; // Correct position
      this.vx *= -1; // Reverse velocity
    }

    // Handle vertical boundary collisions
    if (this.y - this.radius < 0) {
      this.y = this.radius; // Correct position
      this.vy *= -1; // Reverse velocity
    } else if (this.y + this.radius > options.height) {
      this.y = options.height - this.radius; // Correct position
      this.vy *= -1; // Reverse velocity
    }
  }

  // Draw the ball on the canvas
  draw(_ctx) {
    _ctx.beginPath();
    _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // Draw circle
    _ctx.closePath();
    _ctx.fillStyle = this.colour; // Set fill color
    _ctx.fill();
  }
}
