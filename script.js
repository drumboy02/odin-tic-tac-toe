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
    
    return { initBoard, getBoard, markSquare, log };
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
const playGame = () => {
    // Initialize game
    const gameboard = createBoard;
    const player1 = createPlayer('Player 1', 'X');
    const player2 = createPlayer('Player 2', 'O');
    let round = 1;
    let playerTurn = `${player1.getName()}'s turn`;

    // define methods 
    const board = (() => { return gameboard })();
    const getPlayer = () => {
        if (playerTurn === `${player1.getName()}'s turn`) {
            return player1;
        } else {
            return player2;
        }
    };
    const getTurn = () => playerTurn;
    const switchTurn = () => {
        if (playerTurn === `${player1.getName()}'s turn`) {
            playerTurn = `${player2.getName()}'s turn`;
        } else {
            playerTurn = `${player1.getName()}'s turn`;
            round++;
        }
    }
    const getRound = () => round;

/*
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
*/
    // gameboard.log()
    return { board, getPlayer, getTurn, switchTurn, getRound };
}

const game = playGame();

// round 1
console.log(game.getRound())
console.log(game.getTurn())

game.board.markSquare(0, game.getPlayer().makeMark())
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(1, game.getPlayer().makeMark())
game.switchTurn()
game.board.log()

// round 2
console.log(game.getRound())
console.log(game.getTurn())

game.board.markSquare(2, game.getPlayer().makeMark())
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(3, game.getPlayer().makeMark())
game.switchTurn()
game.board.log()

// round 3
console.log(game.getRound())
console.log(game.getTurn())

game.board.markSquare(4, game.getPlayer().makeMark())
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(5, game.getPlayer().makeMark())
game.switchTurn()
game.board.log()

// round 4
console.log(game.getRound())
console.log(game.getTurn())

game.board.markSquare(6, game.getPlayer().makeMark())
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(7, game.getPlayer().makeMark())
game.switchTurn()
game.board.log()