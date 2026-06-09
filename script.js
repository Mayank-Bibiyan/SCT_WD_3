const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const friendModeBtn = document.getElementById("friendMode");
const aiModeBtn = document.getElementById("aiMode");
const winLine = document.getElementById("win-line");

let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/* ---------- MODE BUTTONS ---------- */

friendModeBtn.addEventListener("click", () => {
    vsAI = false;
    restartGame();
    statusText.textContent = "👥 Friend Mode - Player X Starts";
});

aiModeBtn.addEventListener("click", () => {
    vsAI = true;
    restartGame();
    statusText.textContent = "🤖 AI Mode - Player X Starts";
});

/* ---------- CELL CLICK ---------- */

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function handleCellClick() {

    const clickedIndex = this.getAttribute("data-index");

    if (
        gameState[clickedIndex] !== "" ||
        !gameActive
    ) {
        return;
    }

    makeMove(clickedIndex, currentPlayer);

    if (checkWinner()) {
        return;
    }

    if (vsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

/* ---------- MAKE MOVE ---------- */

function makeMove(index, player) {

    gameState[index] = player;

    cells[index].textContent = player;

    if (player === "X") {
        cells[index].classList.add("x");
    } else {
        cells[index].classList.add("o");
    }

    currentPlayer = player === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}

/* ---------- AI MOVE ---------- */

function aiMove() {

    let emptyCells = [];

    gameState.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    const randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(randomIndex, "O");

    checkWinner();
}

/* ---------- WIN LINE ---------- */

function drawWinLine(index) {

    winLine.style.opacity = "1";

    switch(index){

        case 0:
            winLine.style.width = "85%";
            winLine.style.top = "16.5%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(0deg)";
            break;

        case 1:
            winLine.style.width = "85%";
            winLine.style.top = "50%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(0deg)";
            break;

        case 2:
            winLine.style.width = "85%";
            winLine.style.top = "83.5%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(0deg)";
            break;

        case 3:
            winLine.style.width = "85%";
            winLine.style.top = "50%";
            winLine.style.left = "16.5%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(90deg)";
            break;

        case 4:
            winLine.style.width = "85%";
            winLine.style.top = "50%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(90deg)";
            break;

        case 5:
            winLine.style.width = "85%";
            winLine.style.top = "50%";
            winLine.style.left = "83.5%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(90deg)";
            break;

        case 6:
            winLine.style.width = "115%";
            winLine.style.top = "50%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(45deg)";
            break;

        case 7:
            winLine.style.width = "115%";
            winLine.style.top = "50%";
            winLine.style.left = "50%";
            winLine.style.transform =
                "translate(-50%,-50%) rotate(-45deg)";
            break;
    }
}

/* ---------- CHECK WINNER ---------- */

function checkWinner() {

    for (let i = 0; i < winningConditions.length; i++) {

        const [a,b,c] = winningConditions[i];

        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {

            drawWinLine(i);

            statusText.textContent =
                `🎉 Player ${gameState[a]} Wins!`;

            gameActive = false;

            return true;
        }
    }

    if (!gameState.includes("")) {

        statusText.textContent =
            "🤝 Match Draw!";

        gameActive = false;

        return true;
    }

    return false;
}

/* ---------- RESTART ---------- */

restartBtn.addEventListener("click", restartGame);

function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    gameState = ["","","","","","","","",""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x");
        cell.classList.remove("o");
    });

    winLine.style.width = "0";
    winLine.style.opacity = "0";

    winLine.style.top = "50%";
    winLine.style.left = "50%";

    statusText.textContent =
        "Player X's Turn";
}