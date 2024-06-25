document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("reset-button");
    const instructions = document.getElementById("instructions");
    const fullscreenCelebration = document.querySelector(".fullscreen-celebration");
    const centeredCelebration = document.querySelector(".centered-celebration");
    const centeredMessage = document.querySelector(".centered-celebration .message");
    const playAgainButton = document.getElementById("play-again-button");
    const exitButton = document.getElementById("exit-button");
    const closeButton = document.getElementById("close-button");
    const fullscreenRibbon = document.querySelector(".fullscreen-ribbon");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
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

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", () => {
        hideCelebration();
        resetGame();
    });
    exitButton.addEventListener("click", () => {
        hideCelebration();
    });
    closeButton.addEventListener("click", () => {
        hideCelebration();
    });

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

        if (gameState[clickedCellIndex] !== "" || checkWinner()) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        const playerImage = currentPlayer === "X" ? "x image.png" : "o image.png";
        clickedCell.style.backgroundImage = `url('images/${playerImage}')`;

        if (checkWinner()) {
            showFullscreenCelebration();
        } else if (!gameState.includes("")) {
            showCelebration("Game is a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            instructions.textContent = `Player ${currentPlayer === "X" ? 1 : 2} (${currentPlayer})'s turn`;
        }
    }

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.style.backgroundImage = "";
        });
        instructions.textContent = "Player 1 (X) starts";
        hideCelebration();
    }

    function showFullscreenCelebration() {
        fullscreenRibbon.style.display = "flex"; // Show the fullscreen ribbon
        setTimeout(() => {
            fullscreenRibbon.style.display = "none"; // Hide the fullscreen ribbon after 2 seconds
            showCenteredCelebration(`Player ${currentPlayer} has won!`); // Show centered celebration message
        }, 2000);
    }
    

    function showCenteredCelebration(message) {
        centeredMessage.textContent = message;
        centeredCelebration.style.display = "flex";
    }

    function hideCelebration() {
        fullscreenRibbon.style.display = "none";
        centeredCelebration.style.display = "none";
    }

   
});
