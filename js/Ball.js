// Options to dynamically set the canvas dimensions
const options = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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

    // Reverse direction if the ball hits the horizontal boundaries
    if (this.x - this.radius < 0 || this.x + this.radius > options.width) {
      this.vx *= -1;
    }

    // Reverse direction if the ball hits the vertical boundaries
    if (this.y - this.radius < 0 || this.y + this.radius > options.height) {
      this.vy *= -1;
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
