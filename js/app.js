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
        body[0].insertAdjacentHTML('beforeend', this._boardHTML);
        const start = document.getElementById('start');
        const player1 = document.getElementById('player1');
        player1.classList.add('active');
        start.style.display = 'none';
    }

}

class Player {
    constructor(player, isTurn = false, isComputer = false) {
        this._player = player;
        this._isTurn = isTurn;
        this._isComputer = isComputer;
        this._playerActiveGraphic = document.getElementById(this._player);
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
        if (this._player === 'player1' && this._isTurn === true) {
            event.target.classList.add('box-filled-1');
            event.target.classList.add('taken');
            this.turn = false;
            player2.turn = true;
        } else if (this._player === 'player2' && this._isTurn === true) {
            event.target.classList.add('box-filled-2');
            event.target.classList.add('taken');
            this.turn = false;
            player1.turn = true;
        } else {
            return false;
        }
    }

    hoverOn(event) {
        if (this._player === 'player1' && this._isTurn === true) {
            event.target.style.backgroundImage = `url('img/o.svg')`;
        } else if (this._player === 'player2' && this._isTurn === true) {
            event.target.style.backgroundImage = `url('img/x.svg')`;
        } else {
            return false;
        }
    }

    hoverOut(event) {
        if (this._player === 'player1' && this._isTurn === true) {
            event.target.style.backgroundImage = '';
        } else if (this._player === 'player2' && this._isTurn === true && event.target.classList.contains('taken') === false) {
            event.target.style.backgroundImage = '';
        } else {
            return false;
        }
    }


}

function insertGameElements(element) {

    const win = `<div class="screen screen-win" id="finish">
<header>
  <h1>Tic Tac Toe</h1>
  <p class="message"></p>
  <a href="#" class="button">New game</a>
</header>
</div>`;

    // body[0].insertAdjacentHTML('beforeend', board);
    // body[0].insertAdjacentHTML('beforeend', win);

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
        player1 = new Player('player1', true);

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
        if (currentPlayer === 'player1') {
            player1.hoverOn(event);
        } else if (currentPlayer === 'player2') {
            player2.hoverOn(event);
        }
    }
});

document.addEventListener('mouseout', (event) => {

    if (event.target.classList.contains('box') && event.target.tagName === 'LI' && event.target.classList.contains('taken') === false) {
        console.log('mouse out!');
        const currentPlayer = document.querySelector('.active').id;
        if (currentPlayer === 'player1') {
            player1.hoverOut(event);
        } else if (currentPlayer === 'player2') {
            player2.hoverOut(event);
        }

    }
});

