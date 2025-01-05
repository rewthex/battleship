import { GameEngine } from './gameengine';
import { Draggables } from './draggables';
import { createBoards, updateBoard } from './helpers';
import './styles.css';

const ScreenController = (() => {
	const game = new GameEngine();
	const ships = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
	const draggables = new Draggables(ships, handleDrop);

	createBoards();

	const startButton = document.getElementById('start-game');
	const resetButton = document.getElementById('reset-game');
	const rotateButton = document.getElementById('rotate-ships');

	const gameStatus = document.getElementById('game-status');

	const updateScreen = (initialRender = false) => {
		game.getPlayers().forEach((player) => {
			updateBoard(player.name, player.gameboard.board);
		});
	};

	function handleDrop(cell, block) {
		if (cell.parentElement.id !== 'player-board') return;

		const start = cell.dataset.id;
		const type = block.dataset.type;
		const vertical = block.dataset.vertical === 'true';

		return game.placeShip(type, start, vertical);
	}

	function clickHandlerBoard(e) {
		const cell = e.target;
		if (!cell.dataset.id || cell.parentElement.id !== 'computer-board') return;
		game.playRound(cell.dataset.id);
		updateScreen();
	}

	const rotateShips = () => {
		const shipList = document.querySelectorAll('.ship');
		shipList.forEach((ship) => {
			const shipHeight = ship.offsetHeight;
			const shipWidth = ship.offsetWidth;
			ship.style.height = `${shipWidth}px`;
			ship.style.width = `${shipHeight}px`;
			ship.dataset.vertical =
				ship.dataset.vertical === 'true' ? 'false' : 'true';
			console.log(ship.dataset.vertical);
		});
	};

	const startGame = () => {
		if (!game.areAllShipsSet()) {
			gameStatus.innerText = 'You are not prepared for battle!';
			return;
		}
		document
			.getElementById('computer-board')
			.addEventListener('click', clickHandlerBoard);
		updateScreen();
		draggables.disableAll();
	};

	const restartGame = () => window.location.reload();

	startButton.addEventListener('click', startGame);
	resetButton.addEventListener('click', restartGame);
	rotateButton.addEventListener('click', rotateShips);

	updateScreen(true);
})();
