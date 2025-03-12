const canvas = document.getElementById('gradientCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
const colors = ['rgba(0, 119, 255, 0.4)', 'rgba(0, 255, 255, 0.4)', 'rgba(0, 119, 255, 0.6)'];

for (let i = 0; i < 10; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 100 + 50,
    color: colors[Math.floor(Math.random() * colors.length)],
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const circle of circles) {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      circle.x, circle.y, circle.radius * 0.3,
      circle.x, circle.y, circle.radius
    );
    gradient.addColorStop(0, circle.color);
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();

    circle.x += circle.dx;
    circle.y += circle.dy;

    if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
    if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;
  }
  requestAnimationFrame(drawCircles);
}

canvas.addEventListener('mousemove', (e) => {
  for (const circle of circles) {
    const dist = Math.hypot(circle.x - e.clientX, circle.y - e.clientY);
    if (dist < 200) {
      circle.dx += (e.clientX - circle.x) * 0.0005;
      circle.dy += (e.clientY - circle.y) * 0.0005;
    }
  }
});

drawCircles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
