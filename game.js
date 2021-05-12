const gameStatus = document.querySelector('#gameStatus');
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningMessage = () => `${currentPlayer} has won`;
const drawMessage = () => `It's a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const userInput = document.querySelectorAll('.box');
const restartGame = document.querySelector('#restartGame');
gameStatus.innerHTML = currentPlayerTurn();
userInput.forEach((box) => box.addEventListener('click', cellClick));
restartGame.addEventListener('click', restart);

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function cellClick(evt) {
  const clickedCell = evt.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  cellPlayed(clickedCell, clickedCellIndex);
  validateResult();
}

function cellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function validateResult() {
  let isRoundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      isRoundWon = true;
      break;
    }
  }
  if (isRoundWon) {
    gameStatus.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.innerHTML = currentPlayerTurn();
}

function restart() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameStatus.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.box').forEach((box) => (box.innerHTML = ''));
}
