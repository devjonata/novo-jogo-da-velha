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
    if(isDraw){
        winningMessageTextElement.innerText = "Empate!"
    } else {
        winningMessageTextElement.innerText = `${winner} Venceu!`
    }

    winningMessage.classList.add("show-winning-message")
}

const circleTurn = () => {
    
    let position = getRandomIntInclusive(0, 8)
    let cellClass = cellElements[position].className
    let isposition = false;
    
    do{
        position = getRandomIntInclusive(0, 8)
        cellClass = cellElements[position].className
        for(let i=0; i<9; i++){

        }
        if (cellClass.indexOf("circle") < 0 && cellClass.indexOf("x") < 0) {
            placeMark(cellElements[position], "circle");
            isposition = true
        }

    }while(isposition == false);

    const isWin = checkForWin("circle")

    const isDraw = checkForDraw();

    if(isWin){
        endGame(false, "Circulo");
    } else if(isDraw){
        endGame(true, "")
    }
}

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

startGame();
restartButton.addEventListener("click", startGame)