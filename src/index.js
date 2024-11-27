import { Player } from './classes';
import { renderBoard } from './helpers';
import './styles.css';

const GameController = (
	playerOneName = 'Player One',
	playerTwoName = 'Player Two'
) => {
	const players = [
		new Player(playerOneName, 'player-one'),
		new Player(playerTwoName, 'player-two'),
	];

	let activePlayer = players[0];
	let lastRoundResult = 'Prepare for BATTLESHIP!';

	const getPlayers = () => players;

	const getLastRoundResult = () => lastRoundResult;

	const randomizeShips = () => {
		players[0].gameboard.randomizeShips();
		players[1].gameboard.randomizeShips();
	};

	randomizeShips();

	const switchPlayerTurn = () => {
		activePlayer = activePlayer === players[0] ? players[1] : players[0];
	};

	const getActivePlayer = () => activePlayer;
	const getNonActivePlayer = () =>
		activePlayer === players[0] ? players[1] : players[0];

	const gameOver = () => {
		getActivePlayer().gameboard.allShipsSunk() ||
			getNonActivePlayer().gameboard.allShipsSunk();
	};

	const playRound = (coord) => {
		const result = getNonActivePlayer().gameboard.receiveAttack(coord);
		lastRoundResult =
			result === 'hit'
				? `${getActivePlayer().name} struck a ship at ${coord}`
				: `${getActivePlayer().name} missed at ${coord}`;
		switchPlayerTurn();
	};

	return {
		getLastRoundResult,
		getPlayers,
		randomizeShips,
		switchPlayerTurn,
		getActivePlayer,
		getNonActivePlayer,
		gameOver,
		playRound,
	};
};

const ScreenController = () => {
	const game = GameController();
	const gamesBoardContainer = document.querySelector('.gamesboard-container');
	const playerTurnSpan = document.querySelector('#turn-display');
	const gameInfoSpan = document.querySelector('#last-play');

	const updateScreen = () => {
		const players = game.getPlayers();
		gamesBoardContainer.innerHTML = '';
		playerTurnSpan.innerText = `${game.getActivePlayer().name}'s turn to go!`;
		gameInfoSpan.innerText = game.getLastRoundResult();
		gamesBoardContainer.append(
			renderBoard('player-one', players[0].gameboard.board)
		);
		gamesBoardContainer.append(
			renderBoard('player-two', players[1].gameboard.board)
		);
	};

	updateScreen();

	function clickHandlerBoard(e) {
		const cell = e.target.dataset.id;
		const playerNumberBoard = e.target.parentElement.id;
		const activePlayerNumber = game.getActivePlayer().playerNumber;
		if (!cell || playerNumberBoard === activePlayerNumber) return;
		game.playRound(cell);
		updateScreen();
	}

	gamesBoardContainer.addEventListener('click', clickHandlerBoard);
};

ScreenController();
