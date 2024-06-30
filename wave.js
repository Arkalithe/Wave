function initWaveAnimation(firstWaveColor, secondWaveColor, waveAmplitude, waveFrequency, fillSpeed, angleSpeed) {
  // Creation, definition et ajout dans le DOM du canvas
  const canvasWrapper = document.createElement("div");
  canvasWrapper.className = "canvasWrapper";
  const newCanvas = document.createElement("canvas");
  const newCanvasId = "waveCanvas" + document.querySelectorAll("canvas").length;
  newCanvas.id = newCanvasId;
  canvasWrapper.appendChild(newCanvas);
  document.getElementById('canvasContainer').appendChild(canvasWrapper);

  const canvas = newCanvas;
  const ctx = canvas.getContext("2d");

  let width, height, centerX, centerY, radius;
  let angle = 0;
  let fillHeight = 0;

  function resizeCanvas() {
    width = canvas.width = canvasWrapper.clientWidth;
    height = canvas.height = canvasWrapper.clientHeight;
    centerX = width / 2;
    centerY = height / 2;
    radius = Math.min(width, height) / 2 - 50; // Pour ajuster le rayon du cercle
  }

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

    // Vague en premier plan
    ctx.beginPath();
    for (let x = -radius - 50; x <= radius + 50; x++) {
      const y1 = Math.sin((x + angle) * waveFrequency) * waveAmplitude + radius - fillHeight;
      ctx.lineTo(centerX + x, centerY + y1);
    }
    ctx.lineTo(centerX + radius + 50, centerY + radius);
    ctx.lineTo(centerX - radius - 50, centerY + radius);
    ctx.closePath();
    ctx.fillStyle = firstWaveColor; // format "rgba(x,x,x,x)"
    ctx.fill();

    // Vague en deuxieme plan
    ctx.beginPath();
    for (let x = -radius - 50; x <= radius + 50; x++) {
      const y2 = Math.sin((x - angle) * waveFrequency) * waveAmplitude + radius - fillHeight;
      ctx.lineTo(centerX + x, centerY + y2);
    }
    ctx.lineTo(centerX + radius + 50, centerY + radius);
    ctx.lineTo(centerX - radius - 50, centerY + radius);
    ctx.closePath();
    ctx.fillStyle = secondWaveColor; // format "rgba(x,x,x,x)"
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    angle += angleSpeed;
    if (fillHeight < 2 * radius + 20) {
      fillHeight += fillSpeed; // Vitesse a laquelle il se remplit
    } else {
      fillHeight = 0;
    }
    drawWave();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
}

initWaveAnimation('rgba(0,100,200,1)', 'rgba(0,150,255,1)', 20, 0.02, 0.5, 10);
initWaveAnimation('rgba(255,100,0,1)', 'rgba(255,150,0,1)', 25, 0.03, 2, 10);
