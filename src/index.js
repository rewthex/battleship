import { Player, Draggables } from './classes';
import { renderBoard } from './helpers';
import './styles.css';

const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer']

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

	const placeShip = (type, start) => {
		start = Number(start)
		return players[0].gameboard.placeShip(type, start)
		
	}

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

	const playRound = (coord) => {
		console.log(getNonActivePlayer().gameboard)
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
		placeShip,
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
	
	const playerTurnSpan = document.querySelector('#turn-display');
	const gameInfoSpan = document.querySelector('#last-play');
	const gamesBoardContainer = document.querySelector('.gamesboard-container');

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

	const handleDrop = (cell, block) => {
		const start = cell.dataset.id 
		const type = block.dataset.type;
		return game.placeShip(type, start)
	}

	const draggables = new Draggables(ships, handleDrop);

	const clickHandlerBoard = (e) => {
		const cell = e.target.dataset.id;
		const playerNumberBoard = e.target.parentElement.id;
		const activePlayerNumber = game.getActivePlayer().playerNumber;
		if (!cell || playerNumberBoard === activePlayerNumber) return;
		game.playRound(cell);
		updateScreen();
	};
	
	const startGame = () => {
		draggables.disableAll();
		gamesBoardContainer.addEventListener('click', clickHandlerBoard);
	};

	const startButton = document.querySelector('#start');

	startButton.addEventListener('click', startGame);
	updateScreen();

};

ScreenController();
