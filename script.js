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
    const resetScore = () => { score = 0 };
    const makeMark = () => mark;
    
    return { getName, getScore, incScore, resetScore, makeMark };
}

// Game logic
const playGame = () => {
    // Initialize game
    const gameboard = createBoard;
    const player1 = createPlayer('Player 1', 'X');
    const player2 = createPlayer('Player 2', 'O');
    const players = [player1, player2];

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

    const switchTurn = () => {
        if (getTurn() === `${player1.getName()}'s turn`) {
            playerTurn = `${player2.getName()}'s turn`;
        } else {
            // Round is over
            incRound();
            console.log(`Round: ${getRound()}`);
            playerTurn = `${player1.getName()}'s turn`;
        }
    }

    const checkWin = () => {
        // Test for win condition
        const test = board.getBoard();
        const player = getPlayer();

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

        const resetGame = () => {
            // Reset gameboard and round
            board.initBoard();
            round = 1;

            // Switch turns if not player 1
            if (getTurn() === `${player2.getName()}'s turn`) {
                playerTurn = `${player1.getName()}'s turn`;
            } 
        }

        // If there's a winner
        if (testRows() || testColumns() || testDiagonals()) {
            log();

            // Increment score
            player.incScore();
            console.log(`${player.getName()}'s score: ${player.getScore()}`);
            resetGame();

        } else {
            // Test for no win scenario
            let testNoWinner = test.filter(v => v !== null).length;

            if (testNoWinner === 9) {
                log();
                console.log('No winner');
                resetGame();
            } else {
                log()
                console.log(`Next player's turn`);
                return false;
            }
        }
    }

    const takeTurn = ((sqNum) => {
        console.log(`${getTurn()} square: ${sqNum + 1}`)
        const player = getPlayer();

        // If square is empty
        if (!board.getBoard()[sqNum]) {
            board.markSquare(sqNum, player.makeMark());
            if (checkWin() === false) {
                switchTurn();
            } else {
                // Check first to 3
                let score = player.getScore();
                
                if (score === 3) {
                    // console.log(`${player.getName()}'s score: ${score}`);
                    console.log(`${player.getName()} wins the game!`);
                    player1.resetScore();
                    player2.resetScore();
                } else {
                    // console.log(`${player.getName()}'s score: ${score}`);
                    console.log(`Round: ${getRound()}`);
                }
            }
        } else {
            console.log("Choose a different square");
        }
    })
    const passPlayers = () => players;

    // TEMP method to log to console
    const log = () => console.log(board.getBoard());

    //console.log(`Round: ${getRound()}`);

    return { board, getRound, getPlayer, getTurn, takeTurn, passPlayers, log };
}

const screenController = () => {
    // Initialize variables
    const game = playGame();
    const board = game.board.getBoard();
    const players = game.passPlayers();
    // console.log(`player1: ${players[0].getScore()}`);
    // console.log(`player2: ${players[1].getScore()}`);

    const main = document.querySelector('main');

    // Define methods
    const createSquares = () => {
        const boardDiv = main.appendChild(document.createElement('div'));
        boardDiv.classList.add('gameboard');

        // Create squares on board
        for (let i = 0; i < 9; i++) {
            let button = document.createElement('button');
            button.setAttribute('id', `square-${i}`);
            button.classList.add('square');

            boardDiv.appendChild(button);

            // Add even listeners
            let square = document.querySelector(`#square-${i}`);
            square.addEventListener('click', () => {
                console.log(`square-${i} clicked`);

                game.takeTurn(i);
                renderBoard();
            })
        }
    }

    // Render board array to screen
    const renderBoard = () => {
        let squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.innerText = board[index];
        });

        renderScores();
    }

    const renderScores = () => {
        console.log(`round: ${game.getRound()}`);
        console.log(`player1: ${players[0].getScore()}`);
        console.log(`player2: ${players[1].getScore()}`);
    }

    // Check for existing gameboard
   document.querySelector('.gameboard') || createSquares();

    return { createSquares };
}

screenController();

/*
const game = playGame();
game.takeTurn(0);
game.takeTurn(1);
game.takeTurn(2);
game.takeTurn(3)
game.takeTurn(4);
game.takeTurn(5);
game.takeTurn(6);

game.takeTurn(0);
game.takeTurn(1);
game.takeTurn(2);
game.takeTurn(3)
game.takeTurn(4);
game.takeTurn(5);
game.takeTurn(6);

game.takeTurn(0);
game.takeTurn(1);
game.takeTurn(2);
game.takeTurn(3)
game.takeTurn(4);
game.takeTurn(5);
game.takeTurn(6);
*/