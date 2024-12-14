import { Player } from './gameclasses';

export class GameEngine {
	constructor(playerOneName = 'Player One', playerTwoName = 'Player Two') {
		this.players = [
			new Player(playerOneName, 'player-one'),
			new Player(playerTwoName, 'player-two'),
		];
		this.activePlayer = this.players[0];
		this.lastRoundMessage = 'Prepare for BATTLESHIP!';

		this.randomizeShipsForPlayerTwo();
	}

	getPlayers() {
		return this.players;
	}

	getFirstGameboard() {
		return this.players[0].gameboard.board;
	}

	getSecondGameboard() {
		return this.players[1].gameboard.board;
	}

	getFirstPlayersAttacks() {
		return this.players[0].gameboard.attacks;
	}

	getLastRoundMessage() {
		return this.lastRoundMessage;
	}

	randomizeShipsForPlayerTwo() {
		this.players[1].gameboard.randomizeShips();
	}

	placeShip(type, startPosition, vertical) {
		return this.players[0].gameboard.placeShip(
			type,
			Number(startPosition),
			vertical
		);
	}

	areAllShipsSet() {
		return this.players.every((player) => player.gameboard.allShipsSet());
	}

	switchTurn() {
		this.activePlayer =
			this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
	}

	getActivePlayer() {
		return this.activePlayer;
	}

	getInactivePlayer() {
		return this.activePlayer === this.players[0]
			? this.players[1]
			: this.players[0];
	}

	isGameOver() {
		return this.players.some((player) => player.gameboard.allShipsSunk());
	}

	playComputerRound() {
		let randomCoordinate = Math.floor(Math.random() * 100);
		while (this.getFirstPlayersAttacks().has(randomCoordinate)) {
			randomCoordinate = Math.floor(Math.random() * 100);
		}
		this.players[0].gameboard.receiveAttack(randomCoordinate);
		this.switchTurn();
	}

	playRound(coordinate) {
		const result = this.players[1].gameboard.receiveAttack(coordinate);
		if (!result) return;
    this.switchTurn();
		this.playComputerRound();
	}
}
