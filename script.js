// Store gameboard array in object
const createBoard = (() => {
    // Initialize private variables
    const board = [];
    for (i = 0; i < 9; i++) board.push(null);
    // Define methods
    const getBoard = () => board;
    // Return methods
    return { getBoard };
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

const player1 = createPlayer('Brett1', 'X');
const player2 = createPlayer('Brett2', 'O');
const gameboard = createBoard;
