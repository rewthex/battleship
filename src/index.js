import { GameEngine } from './gameengine';
import { Draggables } from './draggables';
import { renderBoard } from './helpers';
import './styles.css';

const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

const ScreenController = () => {
	const game = new GameEngine();
	const draggables = new Draggables(ships, handleDrop);

	const playerTurnSpan = document.querySelector('#turn-display');
	const gameInfoSpan = document.querySelector('#last-play');
	const gamesBoardContainer = document.querySelector('.gamesboard-container');

	const updateScreen = () => {
		const players = game.getPlayers();
		gamesBoardContainer.innerHTML = '';
		playerTurnSpan.innerText = `${game.getActivePlayer().name}'s turn to go!`;
		gameInfoSpan.innerText = game.getLastRoundMessage();
		gamesBoardContainer.append(
			renderBoard('player-one', players[0].gameboard.board, true)
		);
		gamesBoardContainer.append(
			renderBoard('player-two', players[1].gameboard.board, false)
		);
	};

	function handleDrop(cell, block) {
		const start = cell.dataset.id;
		const type = block.dataset.type;
		const vertical = block.dataset.vertical === 'false' ? false : true;
		console.log(start, type, vertical);
		return game.placeShip(type, start, vertical);
	}

	const clickHandlerBoard = (e) => {
		const cell = e.target.dataset.id;
		const playerNumberBoard = e.target.parentElement.id;
		const activePlayerNumber = game.getActivePlayer().playerNumber;
		if (!cell || playerNumberBoard === activePlayerNumber) return;
		game.playRound(cell);
		updateScreen();
	};

	const rotateShips = () => {
		const optionsContainer = document.querySelector('.options-container');
		const ships = optionsContainer.querySelectorAll('div');

		ships.forEach((ship) => {
			if (ship.dataset.set === 'true') return;
			const newHeight = ship.offsetHeight;
			ship.style.height = `${ship.offsetWidth}px`;
			ship.style.width = `${newHeight}px`;
			ship.dataset.vertical =
				ship.dataset.vertical === 'true' ? 'false' : 'true';
		});

		optionsContainer.classList.toggle('options-container-vertical')
	};

	const startGame = () => {
		if (!game.areAllShipsSet()) {
			playerTurnSpan.innerText = 'You are not prepared for battle!';
			return;
		}
		const optionsContainer = document.querySelector('.options-container');
		optionsContainer.remove();
		draggables.disableAll();
		gamesBoardContainer.addEventListener('click', clickHandlerBoard);
	};

	const startButton = document.querySelector('#start');
	const rotateButton = document.querySelector('#rotate');

	startButton.addEventListener('click', startGame);
	rotateButton.addEventListener('click', rotateShips);
	updateScreen();
};

ScreenController();
