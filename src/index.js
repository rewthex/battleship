import { GameEngine } from './gameengine';
import { Draggables } from './draggables';
import { renderBoard } from './helpers';
import './styles.css';

const ScreenController = (() => {
	const game = new GameEngine();
	const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
	const draggables = new Draggables(ships, handleDrop);

	// DOM references
	const playerTurnSpan = document.querySelector('#turn-display');
	const gameInfoSpan = document.querySelector('#last-play');
	const gamesBoardContainer = document.querySelector('.gamesboard-container');
	const startButton = document.querySelector('#start');
	const rotateButton = document.querySelector('#rotate');
	const restartButton = document.querySelector('#restart');

	// Updates the game screen
	const updateScreen = (initialRender = false) => {
		gamesBoardContainer.innerHTML = '';
		if (initialRender) {
			playerTurnSpan.innerText = `Place your ships and...`;
		} else {
			playerTurnSpan.innerText = `${game.getActivePlayer().name}'s turn to go!`;
		}
		gameInfoSpan.innerText = game.getLastRoundMessage();

		game.getPlayers().forEach((player) => {
			gamesBoardContainer.append(
				renderBoard(player.playerNumber, player.gameboard.board, false)
			);
		});

		const playerTwoGameboard = document.getElementById('player-two');
		playerTwoGameboard.addEventListener('click', clickHandlerBoard);
	};

	// Handles ship placement when dropped
	function handleDrop(cell, block) {
		if (cell.parentElement.id !== 'player-one') return;

		const start = cell.dataset.id;
		const type = block.dataset.type;
		const vertical = block.dataset.vertical === 'true';

		return game.placeShip(type, start, vertical);
	}

	// Handles board click interactions
	function clickHandlerBoard(e) {
		if (!game.areAllShipsSet()) return;

		const cell = e.target.dataset.id;
		if (!cell) return;

		game.playRound(cell);
		updateScreen();
	}

	// Rotates ships
	const rotateShips = () => {
		const optionsContainer = document.querySelector('.options-container');
		const ships = optionsContainer.querySelectorAll(
			'div:not([data-set="true"])'
		);

		ships.forEach((ship) => {
			const newHeight = ship.offsetHeight;
			ship.style.height = `${ship.offsetWidth}px`;
			ship.style.width = `${newHeight}px`;
			ship.dataset.vertical =
				ship.dataset.vertical === 'true' ? 'false' : 'true';
		});

		optionsContainer.classList.toggle('options-container-vertical');
	};

	// Starts the game
	const startGame = () => {
		if (!game.areAllShipsSet()) {
			playerTurnSpan.innerText = 'You are not prepared for battle!';
			return;
		}
		updateScreen();
		draggables.disableAll();
	};

	// Restarts the game
	const restartGame = () => window.location.reload();

	// Event listeners
	startButton.addEventListener('click', startGame);
	rotateButton.addEventListener('click', rotateShips);
	restartButton.addEventListener('click', restartGame);

	// Initialize the screen
	updateScreen(true);
})();
