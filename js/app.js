(function () {
    const body = document.getElementsByTagName('BODY');
    let board;
    let player1;
    let player2;

    class Board {
        constructor() {
            this._board = [
                [],
                [],
                []
            ];
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
        loadGame(visible) {
            body[0].innerHTML = this._boardHTML;
            const start = document.getElementById('start');
            const player1 = document.getElementById('player1');
            const boardSpaces = document.querySelectorAll('.box');
            player1.classList.add('active');

            for (let i = 0; i < boardSpaces.length; i++) {
                boardSpaces[i].id = i;
            }
        }

        updateBoard(event, player) {
            const space = event.target.id;
            if (space <= 2) {
                this._board[0][space] = player._letter;
                this.checkWin(player);
            } else if (space >= 3 && space <= 5) {
                this._board[1][space - 3] = player._letter;
                this.checkWin(player);
            } else if (space >= 6 && space <= 8) {
                this._board[2][space - 6] = player._letter;
                this.checkWin(player);
            }


        }

        winScreen(player, isTie = false) {
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

            if (player._isWinner === true) {
                winScreen.classList.add(player._winClass);
                message[0].innerText = 'Winner!';
            } else {
                winScreen.classList.add('screen-win-tie');
                message[0].innerText = 'Tie!';
            }

        }

        checkWin(player) {
            for (let i = 0; i < 3; i++) {
                //check horizontal wins
                if (player._letter === this._board[i][0] &&
                    player._letter === this._board[i][1] &&
                    player._letter === this._board[i][2]) {
                    player._isWinner = true;
                }
                // //check vertical wins
                if (player._letter === this._board[0][i] &&
                    player._letter === this._board[1][i] &&
                    player._letter === this._board[2][i]) {
                    player._isWinner = true;
                }
            }

            //check wins on the diagonal
            if (player._letter === this._board[0][0] &&
                player._letter === this._board[1][1] &&
                player._letter === this._board[2][2]) {
                player._isWinner = true;
            }

            if (player._letter === this._board[0][2] &&
                player._letter === this._board[1][1] &&
                player._letter === this._board[2][0]) {
                player._isWinner = true;
            }

            if (player._isWinner) {
                this.winScreen(player);
            } else if (this._board.toString().length === 17) {
                this.winScreen(player);
            }

        }

        hoverOn(event, currentPlayer) {
            if (currentPlayer === 'player1') {
                event.target.style.backgroundImage = player1.img;
            } else if (currentPlayer === 'player2') {
                event.target.style.backgroundImage = player2.img;
            } else {
                return false;
            }
        }

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

    class Player {
        constructor(player, isComputer = false) {
            this._player = player;
            this._isComputer = isComputer;
            this._playerActiveGraphic = document.getElementById(this._player);
            this._isWinner = false;

            if (this._player === 'player1') {
                this._isTurn = true;
                this._img = `url('img/o.svg')`;
                this._letter = 'o';
                this._playClass = 'box-filled-1';
                this._winClass = 'screen-win-one';
            } else {
                this._isTurn = false;
                this._img = `url('img/x.svg')`;
                this._letter = 'x';
                this._playClass = 'box-filled-2';
                this._winClass = 'screen-win-two';
            }
        }

        get img() {
            return this._img;
        }

        set turn(isTurn) {
            this._isTurn = isTurn;
            if (this._isTurn === false) {
                this._playerActiveGraphic.classList.remove('active');
            }
            if (this._isTurn === true) {
                this._playerActiveGraphic.classList.add('active');
            }
        }


        move(event) {
            event.target.classList.add(this._playClass);
            event.target.classList.add('taken');
            board.updateBoard(event, this);
            this.turn = false;
            if (this._player === 'player1') {
                player2.turn = true;
            } else if (this._player === 'player2') {
                player1.turn = true;
            } else {
                return false;
            }
        }

    }


    window.addEventListener('load', () => {
        const start = `<div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button">Start game</a>
    </header>
    </div>`;
        body[0].innerHTML = start;
    });

    document.addEventListener('mousedown', (event) => {
        if (event.target.className === 'button') {
            board = new Board();
            board.loadGame();
            player2 = new Player('player2');
            player1 = new Player('player1');

        } else if (event.target.className === 'box' && event.target.classList.contains('taken') === false) {
            const currentPlayer = document.querySelector('.active').id;
            if (currentPlayer === 'player1') {
                player1.move(event);
            } else if (currentPlayer === 'player2') {
                player2.move(event);
            }
        }

    });

    document.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('box') && event.target.classList.contains('taken') === false && event.target.tagName === 'LI') {
            const currentPlayer = document.querySelector('.active').id;
            board.hoverOn(event, currentPlayer);
        }
    });

    document.addEventListener('mouseout', (event) => {

        if (event.target.classList.contains('box') && event.target.tagName === 'LI' && event.target.classList.contains('taken') === false) {
            console.log('mouse out!');
            const currentPlayer = document.querySelector('.active').id;
            board.hoverOut(event, currentPlayer);
        }
    });

})();