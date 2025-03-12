
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.size = Math.random() * 3 + 1;
  this.speedX = Math.random() * 1 - 0.5;
  this.speedY = Math.random() * 1 - 0.5;
}

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;

  if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
  if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
};

Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 120, 255, 0.7)";
  ctx.fill();
};

function handleParticles() {
  for (let i = 0; i < particleCount; i++) {
    let p = particles[i];
    p.update();
    p.draw();

    if (mouse.x && mouse.y) {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.x += dx / dist;
        p.y += dy / dist;
      }
    }
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('touchstart', () => {
  mouse.x = null;
  mouse.y = null;
});
window.addEventListener('touchmove', () => {
  mouse.x = null;
  mouse.y = null;
});
