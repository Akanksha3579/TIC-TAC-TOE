const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const winScreen = document.getElementById("winScreen");
const winnerText = document.getElementById("winnerText");
const newGameButton = document.getElementById("newGameButton");
const gameContainer = document.getElementById("gameContainer");

let board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;

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

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showWinScreen(`${currentPlayer} Wins! 🎉`);
            isGameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        showWinScreen("It's a Draw! 🤝");
        isGameActive = false;
        return true;
    }
    return false;
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Player: ${currentPlayer}`;
}

function showWinScreen(message) {
    gameContainer.classList.add("hidden");
    winScreen.classList.remove("hidden");
    winnerText.textContent = message;
}

function resetGame() {
    board.fill("");
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = "Current Player: X";

    gameBoard.innerHTML = "";
    createBoard();

    winScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    }
}

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

createBoard();
