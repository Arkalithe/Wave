const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(width, height) / 2 - 50; // Pour ajuster le rayon du cercle
const angle = 0;
const fillHeight = 0;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawWave() {
  ctx.clearRect(0, 0, width, height);
  drawCircle();

  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.clip();

  ctx.beginPath();
  for (let x = -radius - 50; x <= radius + 50; x++) {
    const y1 = Math.sin((x + angle) * 0.02) * 20 + radius - fillHeight;
    ctx.lineTo(centerX + x, centerY + y1);
  }
  ctx.lineTo(centerX + radius + 50, centerY + radius);
  ctx.lineTo(centerX + radius - 50, centerY + radius);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,100,200,1)';
  ctx.fill();

  ctx.beginPath();
  for (let x = -radius - 50; x <= radius + 50; x++) {
    const y2 = Math.sin((x - angle) * 0.02) * 20 + radius - fillHeight;
    ctx.lineTo(centerX + x, centerY + y2);
  }
  ctx.lineTo(centerX + radius + 50, centerY + radius);
  ctx.lineTo(centerX + radius - 50, centerY + radius);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,150,255,1)';
  ctx.fill();

  ctx.restore();
}

drawWave();
