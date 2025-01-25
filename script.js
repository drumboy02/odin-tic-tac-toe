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

    return { initBoard, getBoard, markSquare };
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

    // Define methods 
    const board = (() => { return gameboard })();

    // Get methods
    const getPlayer = () => {
        // Player1's turn? else player2
        if (getTurn() === `${player1.getName()}'s turn`) {
            return player1;
        } else {
            return player2;
        }
    };
    const getTurn = () => playerTurn;
    const getRound = () => round;
    const incRound = () => { round += 1 };

    // Game logic
    const switchTurn = () => {
        if (getTurn() === `${player1.getName()}'s turn`) {
            playerTurn = `${player2.getName()}'s turn`;
        } else {
            // Round is over
            incRound();
            log();
            console.log(`Round: ${getRound()}`);
            playerTurn = `${player1.getName()}'s turn`;
        }
    }

    const checkWin = () => {
        // Test for win condition
        let test = board.getBoard();
        let player = getPlayer();

        const testRows = () => {
            if (test[0] !== null && test[0] === test[1] && test[1] === test[2]) {
                console.log(`${player.getName()} wins 1-3`);
                return true;
            } else if (test[3] !== null && test[3] === test[4] && test[4] === test[5]) {
                console.log(`${player.getName()} wins 4-6`);
                return true;
            } else if (test[6] !== null && test[6] === test[7] && test[7] === test[8]) {
                console.log(`${player.getName()} wins 7-9`);
                return true;
            } else {
                return false;
            }
        }

        const testColumns = () => {
            if (test[0] !== null && test[0] === test[3] && test[3] === test[6]) {
                console.log(`${player.getName()} wins 1,4,7`);
                return true;
            } else if (test[1] !== null && test[1] === test[4] && test[4] === test[7]) {
                console.log(`${player.getName()} wins 2,5,8`);
                return true;
            } else if (test[2] !== null && test[2] === test[5] && test[5] === test[8]) {
                console.log(`${player.getName()} wins 3,6,9`);
                return true;
            } else {
                return false;
            }
        }

        const testDiagonals = () => {
            if (test[0] !== null && test[0] === test[4] && test[4] === test[8]) {
                console.log(`${player.getName()} wins 1,5,9`);
                return true;
            } else if (test[2] !== null && test[2] === test[4] && test[4] === test[6]) {
                console.log(`${player.getName()} wins 3,5,7`);
                return true;
            } else {
                return false;
            }
        }

        if (testRows() || testColumns() || testDiagonals()) {
            log();

            // Increment score
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);

            // Reset gameboard and round
            board.initBoard();
            round = 1;
            console.log(`Round: ${getRound()}`);

            // Switch turns if not player 1
            if (getTurn() === `${player2.getName()}'s turn`) switchTurn();
        } else {
            console.log('No win');
            return false;
        }

        /*
        if (test[0] !== null && test[0] === test[1] && test[1] === test[2]) {
            // Test rows
            console.log(`${player.getName()} wins 1-3`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[3] !== null && test[3] === test[4] && test[4] === test[5]) {
            console.log(`${player.getName()} wins 4-6`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[6] !== null && test[6] === test[7] && test[7] === test[8]) {
            console.log(`${player.getName()} wins 7-9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[0] !== null && test[0] === test[3] && test[3] === test[6]) {
            // Test columns
            console.log(`${player.getName()} wins 1,4,7`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[1] !== null && test[1] === test[4] && test[4] === test[7]) {
            console.log(`${player.getName()} wins 2,5,8`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[2] !== null && test[2] === test[5] && test[5] === test[8]) {
            console.log(`${player.getName()} wins 3,6,9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[0] !== null && test[0] === test[4] && test[4] === test[8]) {
            // Test diagonals
            console.log(`${player.getName()} wins 1,5,9`);
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // board.initBoard();
        } else if (test[2] !== null && test[2] === test[4] && test[4] === test[6]) {
            console.log(`${player.getName()} wins 3,5,7`);
            log();
            // Increment score
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            // Reset gameboard and round
            board.initBoard();
            round = 1;
            console.log(`Round: ${getRound()}`);
            // Switch turns if not player 1
            if (getTurn() === `${player2.getName()}'s turn`) switchTurn();
        } else {
            console.log('No win');
            return false;
        }
        */

    }

    const takeTurn = ((sqNum) => {
        console.log(getTurn())
        // If square is empty
        if (!board.getBoard()[sqNum]) {
            board.markSquare(sqNum, getPlayer().makeMark());
            // No winner? Switch turns
            if (checkWin() === false) switchTurn();
        } else {
            console.log("Choose a different square");
        }
    })

    // TEMP method to log to console
    const log = () => console.log(board.getBoard());

    console.log(`Round: ${getRound()}`);

    return { board, getRound, getPlayer, getTurn, takeTurn, log };
}

const game = playGame()

game.takeTurn(0)
game.takeTurn(2)
game.takeTurn(4)
game.takeTurn(1)
game.takeTurn(8)
