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
		this.board = Array(100).fill(undefined);
		this.ships = {
			carrier: new Ship('carrier', 5),
			battleship: new Ship('battleship', 4),
			cruiser: new Ship('cruiser', 3),
			submarine: new Ship('submarine', 3),
			destroyer: new Ship('destroyer', 2),
		};
		this.attacks = [];
	}
	placeShip(type, start, isVertical) {
		const shipLength = this.ships[type].length;
		const increment = isVertical ? 10 : 1;
		
		if (
			(isVertical && start + (shipLength - 1) * 10 >= this.board.length) ||
			(!isVertical && (start % 10) + shipLength > 10)
		) {
			return null;
		}

		for (let i = 0; i < shipLength; i++) {
			if (this.board[start + i * increment]) return null;
		}

		this.removeShip(type);

		for (let i = 0; i < shipLength; i++) {
			this.board[start + i * increment] = this.ships[type];
		}

		return true;
	}
	removeShip(type) {
		this.board = this.board.map((cell) => {
			if (cell?.name === type) {
				return undefined;
			} else {
				return cell;
			}
		});
	}
	randomizeShips() {
		const randomNumber = Math.floor(Math.random() * 5);

		switch (randomNumber) {
			case 0:
				this.placeShip('carrier', 0, true);
				this.placeShip('battleship', 22, false);
				this.placeShip('cruiser', 49, true);
				this.placeShip('submarine', 55, false);
				this.placeShip('destroyer', 97, false);
				break;
			case 1:
				this.placeShip('carrier', 5, false);
				this.placeShip('battleship', 10, false);
				this.placeShip('cruiser', 30, true);
				this.placeShip('submarine', 65, true);
				this.placeShip('destroyer', 88, true);
				break;
			case 2:
				this.placeShip('carrier', 91, false);
				this.placeShip('battleship', 9, true);
				this.placeShip('cruiser', 33, true);
				this.placeShip('submarine', 45, false);
				this.placeShip('destroyer', 20, false);
				break;
			case 3:
				this.placeShip('carrier', 50, false);
				this.placeShip('battleship', 81, false);
				this.placeShip('cruiser', 12, true);
				this.placeShip('submarine', 48, true);
				this.placeShip('destroyer', 6, true);
				break;
			case 4:
				this.placeShip('carrier', 15, true);
				this.placeShip('battleship', 84, false);
				this.placeShip('cruiser', 41, true);
				this.placeShip('submarine', 59, true);
				this.placeShip('destroyer', 33, true);
				break;
		}
	}
	receiveAttack(coord) {
		if (this.attacks.includes(coord)) return;
		this.attacks.push(coord);
		const result = this.board[coord];
		if (result !== undefined) {
			result.hit();
			this.board[coord] = 'hit';
			return 'hit';
		} else {
			this.board[coord] = 'miss';
			return 'miss';
		}
	}
	allShipsSet() {
		return this.board.filter((cell) => cell !== undefined).length === 17;
	}
	allShipsSunk() {
		return Object.values(this.ships).every((ship) => ship.isSunk());
	}
}

export class Player {
	constructor(name, playerNumber) {
		this.name = name;
		this.playerNumber = playerNumber;
		this.gameboard = new Gameboard();
	}
}
