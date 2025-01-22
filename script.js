const main = document.querySelector('main');

// Store gameboard array in object
const createBoard = (() => {
    // Initialize private variables
    const board = [];
    // Define methods
    const initBoard = () => {
        for (let i = 0; i < 9; i++) board.push(null);
    }
    const getBoard = () => board;
    const markSquare = (square, mark) => {
        board[square] = mark;
    }
    // Initialize gameboard
    initBoard();
    // TEMP method to log to console
    const log = () => console.log(board);
    // Return methods
    return { log, initBoard, getBoard, markSquare };
})()

// Store players in objects
const createPlayer = (playerName, playerMark) => {
    // Initialize private variables
    const name = playerName;
    const mark = playerMark;
    let score = 0;
    // Define methods
    const getName = () => name;
    const getScore = () => score;
    const incScore = () => { score++ };
    const makeMark = () => mark;
    // Return methods
    return { getName, getScore, incScore, makeMark };
}

// Initialize game
const player1 = createPlayer('Brett1', 'X');
const player2 = createPlayer('Brett2', 'O');
const gameboard = createBoard;
// gameboard.initBoard();

const div = main.appendChild(document.createElement('div'));
div.innerText = gameboard.getBoard();
gameboard.markSquare(3, player1.makeMark());
div.innerText = gameboard.getBoard();