const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const cellSize = 100;

canvas.width = 3 * cellSize;
canvas.height = 3 * cellSize;

function draw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);

  drawBoard();
}

function drawBoard() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';

  // vertical lines
  ctx.beginPath();
  // start from
  ctx.moveTo(cellSize, 10);
  // go to
  ctx.lineTo(cellSize, canvas.height - 10);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cellSize * 2, 10);
  ctx.lineTo(cellSize * 2, canvas.height - 10);
  ctx.stroke();

  // horizontal lines
  ctx.beginPath();
  ctx.moveTo(10, cellSize);
  ctx.lineTo(canvas.width - 10, cellSize);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, cellSize * 2);
  ctx.lineTo(canvas.width - 10, cellSize * 2);
  ctx.stroke();
}

draw();
