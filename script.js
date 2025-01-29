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
            const setModal = document.querySelector('.win-modal')
            setModal.textContent = `${player.getName()} wins`;
            setModal.showModal();
            setTimeout(() => { setModal.close(); }, "1000");

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
                const setModal = document.querySelector('.win-modal')
                setModal.textContent = `No winner`;
                setModal.showModal();
                setTimeout(() => { setModal.close(); }, "1000");

                resetGame();
            } else {
                log()
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
                    const setModal = document.querySelector('.win-modal')
                    setModal.textContent = `${player.getName()} wins the game!`;
                    setModal.showModal();
                    setTimeout(() => { setModal.close(); }, "1000");

                    console.log(`${player.getName()} wins the game!`);
                    player1.resetScore();
                    player2.resetScore();
                } else {
                    console.log(`Round: ${getRound()}`);
                }
            }
        } else {
            document.querySelector('.diff-modal').showModal();
            setTimeout(() => { document.querySelector('.diff-modal').close(); }, "1000");
            console.log("Choose a different square");
        }
    })
    // Pass player objects to screen renderer
    const passPlayers = () => players;

    // Log gameboard to console
    const log = () => console.log(board.getBoard());

    return { board, getTurn, takeTurn, passPlayers };
}

const screenController = () => {
    // Initialize variables
    const game = playGame();
    const board = game.board.getBoard();
    const players = game.passPlayers();

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

            // Add event listeners
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

    // Generate scoreboard
    const createScores = () => {
        const scoresDiv = main.appendChild(document.createElement('div'));
        scoresDiv.classList.add('scores');

        scoresDiv.appendChild(document.createElement('p'))
        .classList.add('info');
        document.querySelector('.info').textContent = game.getTurn();

        const playerScores = scoresDiv.appendChild(document.createElement('div'))
        playerScores.classList.add('score-info');

        playerScores.appendChild(document.createElement('p'))
        .setAttribute('id', 'player1-score');
        document.querySelector('#player1-score')
        .textContent = `${players[0].getName()} Score: ${players[0].getScore()}`;

        playerScores.appendChild(document.createElement('p'))
        .setAttribute('id', 'player2-score');
        document.querySelector('#player2-score')
        .textContent = `${players[1].getName()} Score: ${players[1].getScore()}`;
    }

    // Render scores/info to screen
    const renderScores = () => {
        document.querySelector('.info').textContent = game.getTurn();

        document.querySelector('#player1-score')
        .textContent = `${players[0].getName()} Score: ${players[0].getScore()}`;
        document.querySelector('#player2-score')
        .textContent = `${players[1].getName()} Score: ${players[1].getScore()}`;
    }

    // Create the modal dialog elements
    const createModals = () => {
        const winModal = main.appendChild(document.createElement('dialog'));
        winModal.classList.add('win-modal');
        const diffModal = main.appendChild(document.createElement('dialog'));
        diffModal.classList.add('diff-modal');

        winModal.textContent = "";
        diffModal.textContent = "Choose a different square";
    }

    // Check for existing gameboard
    document.querySelector('.gameboard') || (createSquares(), createScores(), createModals());

    return;
}

screenController();
