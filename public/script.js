const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const startGameButton = document.getElementById('startGame');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;
let playerX = '';
let playerO = '';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGameButton.addEventListener('click', () => {
    playerX = playerXInput.value || 'Player X';
    playerO = playerOInput.value || 'Player O';
    resetGame();
    gameActive = true;
    message.innerText = `${playerX}'s turn`;
});

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-cell-index');

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `${currentPlayer === 'X' ? playerX : playerO}'s turn`;
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `${currentPlayer === 'X' ? playerX : playerO} wins!`;
        updateScore();
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        message.innerText = "It's a draw!";
        gameActive = false;
        return;
    }
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXDisplay.innerText = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        scoreODisplay.innerText = `Player O: ${scoreO}`;
    }
}

restartButton.addEventListener('click', resetGame);

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    message.innerText = '';
    gameState.fill("");
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    createBoard();
}

createBoard();