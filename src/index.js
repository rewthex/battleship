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
		return (
			getActivePlayer().gameboard.allShipsSunk() ||
			getNonActivePlayer().gameboard.allShipsSunk()
		);
	};

	const resetGame = () => {
		players[0] = new Player(playerOneName, 'player-one');
		players[1] = new Player(playerTwoName, 'player-two');
		randomizeShips();
		activePlayer = players[0];
	};

	const playRound = (coord) => {
		const result = getNonActivePlayer().gameboard.receiveAttack(coord);
		if (!result) return;
		lastRoundResult =
			result === 'hit'
				? `${getActivePlayer().name} struck a ship at ${coord}`
				: `${getActivePlayer().name} missed at ${coord}`;
		if (gameOver()) {
			lastRoundResult = `${getActivePlayer().name} has won the game!`;
			return;
		}
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
		resetGame,
		playRound,
	};
};

const ScreenController = () => {
	const game = GameController();

	const playerTurnSpan = document.querySelector('#turn-display');
	const gameInfoSpan = document.querySelector('#last-play');
	const gamesBoardContainer = document.querySelector('.gamesboard-container');
	const optionContainer = document.querySelector('.option-container')

	const updateScreen = () => {
		const players = game.getPlayers();
		gamesBoardContainer.innerHTML = '';
		playerTurnSpan.innerText = `${game.getActivePlayer().name}'s turn to go!`;
		gameInfoSpan.innerText = game.getLastRoundResult();
		gamesBoardContainer.append(
			renderBoard('player-one', players[0].gameboard.board, true)
		);
		gamesBoardContainer.append(
			renderBoard('player-two', players[1].gameboard.board, false)
		);
	};

	const clickHandlerBoard = (e) => {
		const cell = e.target.dataset.id;
		const playerNumberBoard = e.target.parentElement.id;
		const activePlayerNumber = game.getActivePlayer().playerNumber;
		if (!cell || playerNumberBoard === activePlayerNumber) return;
		game.playRound(cell);
		updateScreen();
	};

	const randomize = () => {
		game.resetGame();
		updateScreen();
	}

	const startGame = () => {
		game.resetGame();
		updateScreen();
		gamesBoardContainer.addEventListener('click', clickHandlerBoard);
	};

	const resetGame = () => {
		game.resetGame();
		updateScreen();
	};

	const randomizeButton = document.querySelector('#randomize')
	const startButton = document.querySelector('#start');
	const resetButton = document.querySelector('#reset');

	randomizeButton.addEventListener('click', randomize)
	startButton.addEventListener('click', startGame);
	resetButton.addEventListener('click', resetGame);
	updateScreen();
};

ScreenController();
