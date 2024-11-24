import { Player } from './classes';
import { renderBoard } from './helpers';
import './styles.css';

const playerOne = new Player('Aaron', 'player-one');
playerOne.gameboard.randomizeShips();

const playerTwo = new Player('Hal', 'player-two');
playerTwo.gameboard.randomizeShips();

renderBoard('player-one', playerOne.gameboard.board);
renderBoard('player-two', playerTwo.gameboard.board);

let attackingPlayer = playerOne;
let nonAttackingPlayer = playerTwo;

const startGame = () => {
	const playerOneContainer = document.querySelector('#player-one');
	const playerTwoContainer = document.querySelector('#player-two');
	playerOneContainer.addEventListener('click', handleGridClick);
	playerTwoContainer.addEventListener('click', handleGridClick);
	const playerTurnSpan = document.querySelector('#turn-display');
	playerTurnSpan.innerText = attackingPlayer.name;
};

const switchPlayerTurn = (result, coord) => {
	[attackingPlayer, nonAttackingPlayer] = [nonAttackingPlayer, attackingPlayer];
	const playerTurnSpan = document.querySelector('#turn-display');
	playerTurnSpan.innerText = attackingPlayer.name;
	const infoSpan = document.querySelector('#info');
	if (result === 'hit') {
    infoSpan.innerText = `${nonAttackingPlayer.name} landed a hit at coordinate ${coord}`
  } else {
    infoSpan.innerText = `${nonAttackingPlayer.name} missed at coordinate ${coord}`
  }
};

const handleGridClick = (e) => {
	const cell = e.target;
	const playerBoard = e.currentTarget.id;
	if (playerBoard !== nonAttackingPlayer.playerNumber) return;
	const result = nonAttackingPlayer.gameboard.receiveAttack(cell.id);
	if (!result) return;
	cell.classList.add(result);
	switchPlayerTurn(result, cell.id);
};

const startButton = document.querySelector('#start');
startButton.addEventListener('click', startGame);
