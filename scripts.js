const canvas = document.querySelector('#board');
const ctx = canvas.getContext('2d');
const cellSize = 100;

let lastX = 0;
let lastY = 0;
let coords = {};

let map = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
]
const winningCombos = [
   [1, 1, 1,
    0, 0, 0,
    0, 0, 0],
   [0, 0, 0,
    1, 1, 1,
    0, 0, 0],
   [0, 0, 0,
    0, 0, 0,
    1, 1, 1],
   [1, 0, 0,
    1, 0, 0,
    1, 0, 0],
   [0, 1, 0,
    0, 1, 0,
    0, 1, 0],
   [0, 0, 1,
    0, 0, 1,
    0, 0, 1],
   [1, 0, 0,
    0, 1, 0,
    0, 0, 1],
   [0, 0, 1,
    0, 1, 0,
    1, 0, 0],
  ]

const BLANK = 0;
const X = 1;
const O = -1;

const currentPlayer = X;

canvas.width = 3 * cellSize;
canvas.height = 3 * cellSize;

function createBoard() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBoard();
}

function drawBoard() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  // ctx.lineCap = 'round';

  // vertical lines
  ctx.beginPath();
  // start from
  ctx.moveTo(cellSize, 0);
  // go to
  ctx.lineTo(cellSize, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cellSize * 2, 0);
  ctx.lineTo(cellSize * 2, canvas.height);
  ctx.stroke();

  // horizontal lines
  ctx.beginPath();
  ctx.moveTo(10, cellSize);
  ctx.lineTo(canvas.width, cellSize);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, cellSize * 2);
  ctx.lineTo(canvas.width, cellSize * 2);
  ctx.stroke();
}

function drawX() {
  ctx.beginPath();
  ctx.moveTo(-cellSize / 3 , -cellSize / 3);
  ctx.lineTo(cellSize / 3, cellSize / 3);
  ctx.moveTo(cellSize / 3, -cellSize / 3);
  ctx.lineTo(-cellSize / 3, cellSize / 3);
  ctx.stroke();
}

function drawO() {
  ctx.beginPath();
  ctx.arc(0, 0, cellSize / 3, 0, Math.PI * 2);
  ctx.stroke();
}

function getCoords(e) {
  lastX = e.pageX - canvas.offsetLeft;
  lastY = e.pageY - canvas.offsetTop;
}

// returns 0-8, depending on the cell clicked
function getCellByCoords(x, y) {
  return Math.floor(x / cellSize) % 3 + Math.floor(y / cellSize) * 3;
}

function updateCell(cell) {
  coords = {x: (cell % 3) * cellSize,
            y: Math.floor(cell / 3) * cellSize};

  ctx.save();
  ctx.translate(coords.x + cellSize / 2, coords.y + cellSize / 2);
  (map[cell] === 1 ? drawX(cell) : drawO(cell));
  ctx.restore();
}

function play(e) {
  // find where mouse is clicked
  getCoords(e);
  // figure out what cell that is
  cell = getCellByCoords(lastX, lastY);
  // is cell is already taken, do nothing;
  if (map[cell] != BLANK) return;
  // else, assign to current player
  map[cell] = currentPlayer;
  // add an X or an O to cell
  updateCell(cell);
}

createBoard();

canvas.addEventListener('click', play)
