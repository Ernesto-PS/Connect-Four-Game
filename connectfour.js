const container = document.querySelector(".container");
const playerTurn = document.getElementById("playerTurn");
const message = document.getElementById("message");
let initialMatrix = new Array(6).fill().map(() => new Array(7).fill(0));
let currentPlayer;

function gameOverCheck()
{
    console.log("gameOverCheck");
    let count = 0;
    
    for (innerArray of initialMatrix)
    {
        if (innerArray.every(val => (val) !== 0))
            count++;
        else
            return false;
    }
    
    if (count == 6)
    {
        message.innerText = "Game over";
        return false;
    }
}

function winCheck(row, column) 
{
    console.log("winCheck");
    if (checkHorizontal() || checkVertical() || checkPositiveDiagonal() || checkNegativeDiagonal())
        return true;
    else
        return false;
}

function setPiece(startCount, colValue)
{
    try
    {
        console.log("setPiece");
        let rows = document.querySelectorAll(".grid-row");
        if (initialMatrix[startCount][colValue] != 0)
        {
            startCount--;
            setPiece(startCount, colValue);
        }
        else
        {
            let currentRow = rows[startCount].querySelectorAll(".grid-box");
            currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
            initialMatrix[startCount][colValue] = currentPlayer;
            if (winCheck(startCount, colValue) == true)
            {    
                message.innerHTML = `Player<span>${currentPlayer}</span> wins`;
                return false;
            }
        }
    }
    catch(e)
    {
        alert("Column full, select again");
    }
    gameOverCheck();
}

function checkHorizontal() 
{
    for (let i = 0; i < initialMatrix.length; i++)
    {
        for (let j = 0; j < initialMatrix[i].length - 3; j++)
        {
            if (initialMatrix[i][j] == currentPlayer && initialMatrix[i][j + 1] == currentPlayer && initialMatrix[i][j + 2] == currentPlayer && initialMatrix[i][j + 3] == currentPlayer)
                return true;
        }
    }
    return false;
}

function checkVertical() 
{
    for (let i = 0; i < initialMatrix.length - 3; i++)
    {
        for (let j = 0; j < initialMatrix[i].length; j++)
        {
            if (initialMatrix[i][j] == currentPlayer && initialMatrix[i + 1][j] == currentPlayer && initialMatrix[i + 2][j] == currentPlayer && initialMatrix[i + 3][j] == currentPlayer)
                return true;
        }
    }
    return false;
}

function checkPositiveDiagonal() 
{
    for (let i = 3; i < initialMatrix.length; i++)
    {
        for (let j = 0; j < initialMatrix[i].length - 3; j++)
        {
            if (initialMatrix[i][j] == currentPlayer && initialMatrix[i - 1][j + 1] == currentPlayer && initialMatrix[i - 2][j + 2] == currentPlayer && initialMatrix[i - 3][j + 3] == currentPlayer)
                return true;
        }
    }
    return false;
}

function checkNegativeDiagonal() 
{
    for (let i = 3; i < initialMatrix.length; i++)
    {
        for (let j = 3; j < initialMatrix[i].length; j++)
        {
            if (initialMatrix[i][j] == currentPlayer && initialMatrix[i - 1][j - 1] == currentPlayer && initialMatrix[i - 2][j - 2] == currentPlayer && initialMatrix[i - 3][j - 3] == currentPlayer)
                return true;
        }
    }
    return false;
}

function fillBox(e)
{
    console.log("fillBox");
    let colValue = parseInt(e.target.getAttribute("data-value"));
    setPiece(5, colValue);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

function createBoard()
{
    console.log("createBoard");    
    for (innerArray in initialMatrix)
    {
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", innerArray);   
        for (j in initialMatrix[innerArray])
        {
            initialMatrix = Array(6).fill().map(() => Array(7).fill(0));
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("grid-box");
            innerDiv.setAttribute("data-value", j);
            innerDiv.addEventListener("click", (e) => { fillBox(e); });
            outerDiv.appendChild(innerDiv);
        }
        container.appendChild(outerDiv);
    }
}

function startGame()
{   
    console.log("startGame");
    currentPlayer = 1;
    container.innerHTML = '';
    createBoard();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

window.onload = startGame();
