const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberofparticle = 70;

let particlearray = [];
let titleElement = document.getElementById("doodle");
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurements.left,
  y: titleMeasurements.top,
  width: titleMeasurements.width,
  height: titleMeasurements.height,
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 6;
    this.weight = 4;
    this.directionX = -1;
  }
  update() {
    this.x += this.directionX;
    this.weight += 0.05;
    this.y += this.weight;
    if (this.y > canvas.height) {
      this.y = 0;
      this.weight = 4;
      this.x = Math.random() * canvas.width;
    }
    if (
      this.x <= title.x + title.width &&
      this.x + this.size >= title.x &&
      this.y <= title.y + title.height &&
      this.y + this.size >= title.y
    ) {
      this.y -= 3;
      this.weight *= -0.7;
    }
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
function numbering() {
  for (let i = 0; i < numberofparticle; i++) {
    let w = Math.random() * canvas.width;
    let h = Math.random() * canvas.height;
    particlearray.push(new Particle(w, h));
  }
}
numbering();
const particle1 = new Particle(100, 00);
const particle2 = new Particle(200, 00);

function animate() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numberofparticle; i++) {
    particlearray[i].update();
    particlearray[i].draw();
  }

  requestAnimationFrame(animate);
}
animate();
