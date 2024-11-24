import { Player } from './classes';
import { renderBoard } from './helpers';
import './styles.css';

const gameController = (() => {
	const players = [
		new Player('Aaron', 'player-one'),
		new Player('Hal', 'player-two'),
	];

	let activePlayer = players[0];

	const getPlayers = () => players;

	const randomizeShips = () => {
		players[0].gameboard.randomizeShips();
		players[1].gameboard.randomizeShips();
	};

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;
	const getNonActivePlayer = () =>
		activePlayer === players[0] ? players[1] : players[0];

	const gameOver = () =>
		getActivePlayer().gameboard.allShipsSunk ||
		getNonActivePlayer().gameboard.allShipsSunk();

	const receiveAttack = (coord) =>
		getNonActivePlayer.gameboard.receiveAttack(coord);

	return {
		getPlayers,
		randomizeShips,
		switchPlayerTurn,
		getActivePlayer,
		getNonActivePlayer,
		gameOver,
		receiveAttack,
	};
})();

const screenController = (() => {
	const gamesBoardContainer = document.querySelector('.gamesboard-container');

	const renderBoards = () => {
		const players = gameController.getPlayers();
		gamesBoardContainer.append(
			renderBoard('player-one', players[0].gameboard.board)
		);
		gamesBoardContainer.append(
			renderBoard('player-two', players[1].gameboard.board)
		);
	};

	renderBoards();
})();

// let attackingPlayer = playerOne;
// let nonAttackingPlayer = playerTwo;

// const startGame = () => {
// 	playerOneContainer.addEventListener('click', handleGridClick);
// 	playerTwoContainer.addEventListener('click', handleGridClick);
// 	const playerTurnSpan = document.querySelector('#turn-display');
// 	playerTurnSpan.innerText = attackingPlayer.name;
// };

// const switchPlayerTurn = (result, coord) => {
// 	[attackingPlayer, nonAttackingPlayer] = [nonAttackingPlayer, attackingPlayer];
// 	const playerTurnSpan = document.querySelector('#turn-display');
// 	playerTurnSpan.innerText = attackingPlayer.name;
// 	const infoSpan = document.querySelector('#info');
// 	if (result === 'hit') {
// 		infoSpan.innerText = `${nonAttackingPlayer.name} landed a hit at coordinate ${coord}`;
// 	} else {
// 		infoSpan.innerText = `${nonAttackingPlayer.name} missed at coordinate ${coord}`;
// 	}
// };

// const handleGridClick = (e) => {
// 	const cell = e.target;
// 	const playerBoard = e.currentTarget.id;
// 	if (playerBoard !== nonAttackingPlayer.playerNumber) return;
// 	const result = nonAttackingPlayer.gameboard.receiveAttack(cell.id);
// 	if (!result) return;
// 	cell.classList.add(result);
// 	switchPlayerTurn(result, cell.id);
// };

// const startButton = document.querySelector('#start');
// startButton.addEventListener('click', startGame);
