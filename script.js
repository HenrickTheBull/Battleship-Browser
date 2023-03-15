const boardSize = 10;
const shipLength = 4;
let board = [];
let ship;

function generateBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = 0;
    }
  }
}

function placeShip() {
  const direction = Math.floor(Math.random() * 2);
  const startX = Math.floor(Math.random() * (boardSize - (direction ? shipLength : 0)));
  const startY = Math.floor(Math.random() * (boardSize - (direction ? 0 : shipLength)));
  for (let i = 0; i < shipLength; i++) {
    board[startX + (direction ? i : 0)][startY + (direction ? 0 : i)] = 1;
  }
}

function renderBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => cellClicked(i, j));
      gameBoard.appendChild(cell);
    }
  }
}

function cellClicked(x, y) {
  const cell = event.target;
  if (board[x][y] === 1) {
    cell.classList.add('hit');
    board[x][y] = -1;
    checkWin();
  } else if (board[x][y] === 0) {
    cell.classList.add('miss');
    board[x][y] = -1;
  }
}

function checkWin() {
  let remaining = 0;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 1) remaining++;
    }
  }
  if (remaining === 0) {
    alert('Congratulations! You sunk the battleship!');
  }
}

function initGame() {
  generateBoard();
  placeShip();
  renderBoard();
}

initGame();
