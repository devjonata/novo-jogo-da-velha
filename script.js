const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winninig-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const startGame = () => {
    isCircleTurn = false;

    for(const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message")
}

const endGame = (isDraw, winner) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = `${winner} Venceu!`;
  }

  winningMessage.classList.add("show-winning-message");
};


const circleTurn = () => {
  let bestMove;
  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (!cellElements[i].classList.contains("x") && !cellElements[i].classList.contains("circle")) {
      cellElements[i].classList.add("circle");
      const score = minimax(board, 0, false);
      cellElements[i].classList.remove("circle");

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  placeMark(cellElements[bestMove], "circle");

  const isWin = checkForWin("circle");
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false, "Círculo");
  } else if (isDraw) {
    endGame(true, "");
  }
};


const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove("circle")
    board.classList.remove("x")

    if (isCircleTurn) {
        board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = "x";

    placeMark(cell, classToAdd);
    
    const isWin = checkForWin("x");
    
    const isDraw = checkForDraw();

    if(isWin){
        endGame(false, "X");
    } else if(isDraw) {
        endGame(true, "");
    } else {
        circleTurn();
    }
}

function minimax(board, depth, maximizingPlayer) {
  if (checkForWin("x")) {
    return -10 + depth;
  }

  if (checkForWin("circle")) {
    return 10 - depth;
  }

  if (checkForDraw()) {
    return 0;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!cellElements[i].classList.contains("x") && !cellElements[i].classList.contains("circle")) {
        cellElements[i].classList.add("circle");
        const eval = minimax(board, depth + 1, false);
        cellElements[i].classList.remove("circle");
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!cellElements[i].classList.contains("x") && !cellElements[i].classList.contains("circle")) {
        cellElements[i].classList.add("x");
        const eval = minimax(board, depth + 1, true);
        cellElements[i].classList.remove("x");
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }
}


startGame();
restartButton.addEventListener("click", startGame)