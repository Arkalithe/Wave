const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = Math.min(width,height) / 2 - 150;




function drawCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke()
}

drawCircle();