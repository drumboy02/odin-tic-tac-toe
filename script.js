const main = document.querySelector('main');

// Store gameboard array in object
const createBoard = (() => {
    // Initialize private variables
    const board = [];

    // Define methods
    const initBoard = () => {
        board.length = 0;
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
    const incScore = () => { score += 1 };
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
        if (getTurn() === `${player1.getName()}'s turn`) {
            return player1;
        } else {
            return player2;
        }
    };
    const getTurn = () => playerTurn;
    const switchTurn = () => {
        if (getTurn() === `${player1.getName()}'s turn`) {
            playerTurn = `${player2.getName()}'s turn`;
        } else {
            playerTurn = `${player1.getName()}'s turn`;
            incRound();
        }
    }
    const getRound = () => round;
    const incRound = () => { round += 1 };
    const checkWin = () => {
        // Test for win condition
        let test = board.getBoard();
        let player = getPlayer();

        if (test[0] !== null && test[0] === test[1] && test[1] === test[2]) {
            // test rows
            console.log(`${player.getName()} wins 1-3`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[3] !== null && test[3] === test[4] && test[4] === test[5]) {
            console.log(`${player.getName()} wins 4-6`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[6] !== null && test[6] === test[7] && test[7] === test[8]) {
            console.log(`${player.getName()} wins 7-9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[0] !== null && test[0] === test[3] && test[3] === test[6]) {
            // test columns
            console.log(`${player.getName()} wins 1,4,7`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[1] !== null && test[1] === test[4] && test[4] === test[7]) {
            console.log(`${player.getName()} wins 2,5,8`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[2] !== null && test[2] === test[5] && test[5] === test[8]) {
            console.log(`${player.getName()} wins 3,6,9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[0] !== null && test[0] === test[4] && test[4] === test[8]) {
            // test diagonals
            console.log(`${player.getName()} wins 1,5,9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
        } else if (test[2] !== null && test[2] === test[4] && test[4] === test[6]) {
            console.log(`${player.getName()} wins 3,5,7`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else {
            console.log('no win');
        }
    }

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

*/
    return { board, getPlayer, getTurn, switchTurn, getRound, incRound, checkWin };
}

const game = playGame();

// round 1
console.log(`round: ${game.getRound()}`);
console.log(game.getTurn())

game.board.markSquare(0, game.getPlayer().makeMark())
game.checkWin();
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(1, game.getPlayer().makeMark())
game.checkWin();
game.board.log()

game.switchTurn()

// round 2
console.log(`round: ${game.getRound()}`);
console.log(game.getTurn())

game.board.markSquare(2, game.getPlayer().makeMark())
game.checkWin();
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(3, game.getPlayer().makeMark())
game.checkWin();
game.board.log()

game.switchTurn()

// round 3
console.log(`round: ${game.getRound()}`);
console.log(game.getTurn())

game.board.markSquare(4, game.getPlayer().makeMark())
game.checkWin();
game.switchTurn()
console.log(game.getTurn())

game.board.markSquare(5, game.getPlayer().makeMark())
game.checkWin();
game.board.log()

game.switchTurn()

// round 4
console.log(`round: ${game.getRound()}`);
console.log(game.getTurn())

game.board.markSquare(6, game.getPlayer().makeMark())
game.checkWin();
game.board.log()
