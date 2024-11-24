export class GameController {
	constructor(playerOne, playerTwo) {
		this.players = [playerOne, playerTwo];
		this.attackingPlayerIndex = 0;
	}

	get attackingPlayer() {
		return this.players[this.attackingPlayerIndex];
	}

	get nonAttackingPlayer() {
		return this.players[1 - this.attackingPlayerIndex];
	}

	switchTurn(result, coord) {
		const attackingPlayer = this.attackingPlayer;
		const nonAttackingPlayer = this.nonAttackingPlayer;

		this.attackingPlayerIndex = 1 - this.attackingPlayerIndex;

		return {
			attacker: attackingPlayer.name,
			defender: nonAttackingPlayer.name,
			result,
			coord,
		};
	}

	handleAttack(coord) {
		const nonAttackingPlayer = this.nonAttackingPlayer;
		const result = nonAttackingPlayer.gameboard.receiveAttack(coord);

		if (result) {
			return this.switchTurn(result, coord);
		}

		return null;
	}
}