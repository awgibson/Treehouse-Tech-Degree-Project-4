//Code is wrapped in a self executing function
(function () {
    //Declare global variables
    const body = document.getElementsByTagName('BODY');
    let board;
    let player1;
    let player2;

    //The Board class which holds the behaviors and properties of the game board
    class Board {
        constructor() {

            //Create an empty 3x3 array to store the state of the board
            this._board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];

            //The HTML markup for a blank board
            this._boardHTML = `<div class="board" id="board">
        <header>
          <h1>Tic Tac Toe</h1>
          <ul>
            <li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
            <li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
          </ul>
        </header>
        <ul class="boxes">
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li>
          <li class="box"></li> 
          <li class="box"></li>
        </ul>
        </div>`;
        }

        //Load game function generates a blank board, highlights player 1 default, assigns an 'id' to each square
        //starting from 0 for easy space identification, adds a class of 'free' to each square since nothing is played.
        loadGame(p1Name, p2Name) {
            body[0].innerHTML = this._boardHTML;
            const player1Highlight = document.getElementById('player1');
            const player2Highlight = document.getElementById('player2');
            const boardSpaces = document.querySelectorAll('.box');
            player1Highlight.classList.add('active');

            //Conditional statements check if the players have entered a name and displays them if they have
            //otherwise, the 'X' and 'O' graphic will be displayed by default.
            if (p1Name.length > 0) {
                player1Highlight.innerText = p1Name;
            }
            if (p2Name.length > 0) {
                player2Highlight.innerText = p2Name;
            }

            //Loops through all board spaces and applies the class of 'free' indicated it is an empty space
            for (let i = 0; i < boardSpaces.length; i++) {
                boardSpaces[i].id = i;
                boardSpaces[i].classList.add('free');
            }
        }

        //Update board pushes an 'x' or an 'o' to the board array created in the constructor to update the state of the game
        updateBoard(event, player) {
            const space = event.target.id;
            if (space <= 2) {
                this._board[0][space] = player._letter;
            } else if (space >= 3 && space <= 5) {
                this._board[1][space - 3] = player._letter;
            } else if (space >= 6 && space <= 8) {
                this._board[2][space - 6] = player._letter;
            }

            //Checks if there is a winner or tie after the board is updated then evokes the correct win screen.
            if (this.checkWin(player) && (this.checkWin(player) !== 'tie')) {
                player._isWinner = true;
                this.winScreen(player);
            } else if (this.checkWin(player) === 'tie') {
                this.winScreen(player, 'tie');
            }
        }

        //Method for displaying the appropriate win screen
        winScreen(player, tie) {

            //Variable that holds the HTML for the win screen
            const win = `<div class="screen screen-win" id="finish">
        <header>
          <h1>Tic Tac Toe</h1>
          <p class="message"></p>
          <a href="#" class="button">New game</a>
        </header>
      </div>`;

            body[0].innerHTML = win;
            const winScreen = document.getElementById('finish');
            const message = document.getElementsByClassName('message');

            //Conditionals to check which win screen to display
            //Tie screen conditional
            if (tie === 'tie') {
                winScreen.classList.add('screen-win-tie');
                message[0].innerText = 'Tie!';
            }
            //Win screen if there is no player name
            else if (player._isWinner === true && player._name === '') {
                winScreen.classList.add(player._winClass);
                message[0].innerText = 'Winner!';
            }
            //Win screen if there is a player name
            else if (player._isWinner === true && player._name !== player._player) {
                winScreen.classList.add(player._winClass);
                message[0].innerText = `${player._name} Wins!`;
            }
        }

        //Checks the current board state if there is a winner
        checkWin(player) {
            for (let i = 0; i < 3; i++) {
                //check horizontal wins
                if (player._letter === this._board[i][0] &&
                    player._letter === this._board[i][1] &&
                    player._letter === this._board[i][2]) {
                    return true;
                }
                //check vertical wins
                if (player._letter === this._board[0][i] &&
                    player._letter === this._board[1][i] &&
                    player._letter === this._board[2][i]) {
                    return true;
                }
            }

            //check wins on the diagonals
            if (player._letter === this._board[0][0] &&
                player._letter === this._board[1][1] &&
                player._letter === this._board[2][2]) {
                return true;
            }

            if (player._letter === this._board[0][2] &&
                player._letter === this._board[1][1] &&
                player._letter === this._board[2][0]) {
                return true;
            }

            //Check for a tie
            if (this._board.toString().length === 17) {
                return 'tie';
            }
        }

        //Handles displaying the current player's 'X' or 'O' on mouse hover
        hoverOn(event, currentPlayer) {
            if (currentPlayer === 'player1') {
                event.target.style.backgroundImage = player1.img;
            } else if (currentPlayer === 'player2') {
                event.target.style.backgroundImage = player2.img;
            } else {
                return false;
            }
        }

        //Returns the board space to the default blank state when mouse hovers out of space
        hoverOut(event, currentPlayer) {
            if (currentPlayer === 'player1') {
                event.target.style.backgroundImage = '';
            } else if (currentPlayer === 'player2') {
                event.target.style.backgroundImage = '';
            } else {
                return false;
            }
        }
    }

    //Play class for creating the players
    class Player {
        constructor(player, name) {
            this._player = player; //Indicates player1 or player2
            this._name = name; //Stores name if available
            this._playerActiveGraphic = document.getElementById(this._player); //Checks to see which player is highlighted at top of board
            this._isWinner = false; //Player win state

            //Conditionals that add specific properties to player1 and player2
            if (this._player === 'player1') {
                this._isTurn = true; //Player 1 defaults to true for first move
                this._img = `url('img/o.svg')`; //The 'O' board graphic
                this._letter = 'o'; //Indicates the player's letter
                this._playClass = 'box-filled-1'; //Decorative CSS class when a space is taken
                this._winClass = 'screen-win-one'; //Decorative CSS class for player 1's win screen
            } else {
                this._isTurn = false; //Player 2 defaults to false for first move
                this._img = `url('img/x.svg')`; //The 'X' board graphic
                this._letter = 'x'; //Indicates the player's letter
                this._playClass = 'box-filled-2'; //Decorative CSS class when a space is taken
                this._winClass = 'screen-win-two'; //Decorative CSS class for player 2's win screen
            }

            //If the player is to be a computer, the isComputer is updated to true
            if (this._name === 'Computer') {
                this._isComputer = true;
            }
        }

        //Getter for the player graphic
        get img() {
            return this._img;
        }

        //Setter to set the player's turn and highlight the active player at the top of the board
        set turn(isTurn) {
            this._isTurn = isTurn;
            if (this._isTurn === false) {
                this._playerActiveGraphic.classList.remove('active');
            }
            if (this._isTurn === true) {
                this._playerActiveGraphic.classList.add('active');
            }
        }

        //Handles making a move
        move(event) {
            event.target.classList.remove('free'); //The 'free' class is removed indcating the space cannot be played again
            event.target.classList.add(this._playClass); //Adds the class for the current player (The 'X' or the 'O')
            event.target.classList.add('taken'); // A class of 'taken' is given showing the space is played
            board.updateBoard(event, this); //Calls the updateBoard method to update the board._board array.
            this.turn = false; //Sets the turn of the player that just moved to false

            //Sets the state of the other player's turn to true
            if (this._player === 'player1') {
                player2.turn = true;
            } else if (this._player === 'player2') {
                player1.turn = true;
            } else {
                return false;
            }

            //If player 2 is a computer player, the computerMove method is evoked
            if (this._player === 'player1' && player2._isComputer && !player1._isWinner && !player2._isWinner) {
                player2.computerMove();
            }
        }

        //Very simple computer player. Grabs all elements with the class of 'free' then random picks a free space to play
        computerMove() {
            const emptySpaces = document.getElementsByClassName('free');
            const move = Math.floor(Math.random() * emptySpaces.length);

            document.getElementsByClassName('free')[move].click();
        }
    }

    //Loads the start screen on page load
    window.addEventListener('load', () => {
        const start = `<div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <div class="player-inputs">
      <label for="player1-name">Player 1 Name:</label>
        <input type="text" id="player1-name" maxlength="16"><br />

    <label for="player2-name">Player 2 Name:</label>
        <input type="text" id="player2-name" maxlength="16">
        <input type="checkbox" id="cpu-player">
        <label for="cpu-player">Make Player 2 CPU Player</label>
        </div>
      <a href="#" class="button">Start game</a>
    </header>
    </div>`;
        body[0].innerHTML = start;
    });

    //Event listener to handle click events
    document.addEventListener('click', (event) => {

        //This handles the click of a 'button'. The only 2 buttons are the initial start game button and the
        //new game button after a player wins of a tie happens.
        if (event.target.className === 'button') {
            let p1Name;
            let p2Name;

            //If the input boxes for player names are present, the value is passed to the player objects
            //If not are present, either a blank string is passed or the names used in the last game are passed
            if (document.querySelectorAll('INPUT').length > 0) {
                p1Name = document.querySelector('#player1-name').value;
                p2Name = document.querySelector('#player2-name').value;
            } else {
                p1Name = player1._name;
                p2Name = player2._name;
            }

            //New board object is created and the game loaded.
            board = new Board();
            board.loadGame(p1Name, p2Name);

            //Players are created
            player2 = new Player('player2', p2Name);
            player1 = new Player('player1', p1Name);
        }

        //Handles clicking on the game spaces on the board and executes the appropriate player move.
        else if (event.target.classList.contains('box') && event.target.classList.contains('taken') === false) {
            if (player1._isTurn) {
                player1.move(event);
            } else if (player2._isTurn) {
                player2.move(event);
            }
        }

    });

    //Triggers the hoverOn method of the correct player
    document.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('box') && event.target.classList.contains('taken') === false && event.target.tagName === 'LI') {
            const currentPlayer = document.querySelector('.active').id;
            board.hoverOn(event, currentPlayer);
        }
    });

    //Triggers the hoverOff method of the correct player
    document.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('box') && event.target.tagName === 'LI' && event.target.classList.contains('taken') === false) {
            const currentPlayer = document.querySelector('.active').id;
            board.hoverOut(event, currentPlayer);
        }
    });

    //Listener for if the box is checked to create a computer player
    //The name of the player is set to 'Computer'
    //The input field is disabled
    document.addEventListener('change', (event) => {
        if (event.target.id === 'cpu-player') {
            const player2 = document.querySelector('#player2-name');
            if (event.target.checked) {

                player2.disabled = true;
                player2.value = 'Computer';
            } else {
                player2.value = '';
                player2.disabled = false;
            }
        }
    });
})();