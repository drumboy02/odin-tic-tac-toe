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
    
    return { getName, getScore, incScore, makeMark };
}

// Game logic

// Initialize game
const player1 = createPlayer('Brett1', 'X');
const player2 = createPlayer('Brett2', 'O');
const gameboard = createBoard;
let round = 0;
let playerTurn = `${player1.getName()}'s turn`;

// Play round
do {
console.log(`round: ${round + 1}`);
console.log(playerTurn);
// mark square
// test 
playerTurn = `${player2.getName()}'s turn`;
console.log(playerTurn);
// mark square
// test
round += 1;
} while (round < 5)

// fill the board with marks
// for (let i = 0, len = gameboard.getBoard().length; i < len; i++) {
//     gameboard.markSquare(i, player1.makeMark());
// }

// Test for win condition
let test = gameboard.getBoard();
if (test[0] !== null && test[0] === test[1] && test[1] === test[2]) {
    // test rows
    console.log('win 1-3');
} else if (test[3] !== null && test[3] === test[4] && test[4] === test[5]) {
    console.log('win 4-6');
} else if (test[6] !== null && test[6] === test[7] && test[7] === test[8]) {
    console.log('win 7-9');
} else if (test[0] !== null && test[0] === test[3] && test[3] === test[6]) {
    // test columns
    console.log('win 1,4,7');
} else if (test[1] !== null && test[1] === test[4] && test[4] === test[7]) {
    console.log('win 2,5,8');
} else if (test[2] !== null && test[2] === test[5] && test[5] === test[8]) {
    console.log('win 3,6,9');
} else if (test[0] !== null && test[0] === test[4] && test[4] === test[8]) {
    // test diagonals
    console.log('win 1,5,9');
} else if (test[2] !== null && test[2] === test[4] && test[4] === test[6]) {
    console.log('win 3,5,7');
} else {
    // switch player
    // test for no win
}

gameboard.log()