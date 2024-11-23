export class Ship {
	constructor(name, length) {
		this.name = name;
		this.length = length;
		this.hits = 0;
	}
	hit() {
		this.hits += 1;
	}
	isSunk() {
		return this.hits >= this.length;
	}
}

export class Gameboard {
	constructor() {
		this.board = Array(100);
		this.ships = {
			carrier: new Ship('carrier', 5),
			battleship: new Ship('battleship', 4),
			cruiser: new Ship('cruiser', 3),
			submarine: new Ship('submarine', 3),
			destroyer: new Ship('destroyer', 2),
		};
		this.missedShots = [];
	}
	placeShip(type, start, isVertical = false) {
		const shipLength = this.ships[type].length;
		const increment = isVertical ? 10 : 1;

		for (let i = 0; i < shipLength; i++) {
			this.board[start + i * increment] = this.ships[type];
		}
	}
	receiveAttack(coord) {
		const result = this.board[coord];
		if (result !== undefined) {
			result.hit();
		} else {
			this.missedShots.push(coord);
		}
	}
}

export class Player {
	constructor(name, type = 'human') {
		this.name = name;
    this.type = type;
		this.gameboard = new Gameboard();
	}
}
