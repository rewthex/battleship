import { renderBoard } from "./helpers";

export class GameUI {
	constructor(gameEngine) {
		this.gameEngine = gameEngine;
	}

	renderBoard(player, containerId, width = 10) {
		const container = document.querySelector(`.gamesboard-container`);
		
		const board = renderBoard(player.playerNumber, player.gameboard.board);
		container.appendChild(board);
	}

	updateTurnDisplay() {
		const playerTurnSpan = document.querySelector('#turn-display');
		playerTurnSpan.innerText = this.gameEngine.attackingPlayer.name;
	}

	updateInfoDisplay({ defender, result, coord }) {
		const infoSpan = document.querySelector('#info');
		infoSpan.innerText = `${defender} ${result} at coordinate ${coord}`;
	}

	highlightCell(coord, result) {
		const cell = document.getElementById(coord);
		if (cell) {
			cell.classList.add(result);
		}
	}
}
