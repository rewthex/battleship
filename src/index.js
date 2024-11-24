import { Player } from './classes';
import './styles.css'

const humanPlayer = new Player('Aaron', 'human')
humanPlayer.gameboard.randomizeShips();

const computerPlayer = new Player('Hal', 'computer')
computerPlayer.gameboard.randomizeShips();

const renderBoard = (player, gameboard) => {
    const width = 10;
  
    const gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('game-board');
    gameBoardContainer.setAttribute('id', player)
  
    for (let i = 0; i < width * width; i++) {
      const block = document.createElement('div');
      block.classList.add('block');
      if (gameboard[i] !== undefined) {
        const shipType = gameboard[i]['name']
        block.classList.add(shipType)
      }
      block.id = i;
      gameBoardContainer.append(block);
    }
  
    const gamesBoardContainer = document.querySelector('.gamesboard-container')
    gamesBoardContainer.append(gameBoardContainer)
}

renderBoard('player-one', humanPlayer.gameboard.board)
renderBoard('player-one', computerPlayer.gameboard.board)

const startGame = () => {
  const playerOneContainer = document.querySelector('#player-one')
  const playerTwoContainer = document.querySelector('#player-two')
  playerOneContainer.addEventListener('click', (e) => {
    console.log(e);
  })
  playerTwoContainer.addEventListener('click', (e) => {
    console.log(e);
  })
}