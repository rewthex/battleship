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
		this.attacks = [];
	}
	placeShip(type, start, isVertical = false) {
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

		for (let i = 0; i < shipLength; i++) {
			this.board[start + i * increment] = this.ships[type];
		}

		return true;
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

export class Draggable {
	constructor(selector, onDrop) {
		this.block = document.querySelector(selector);
		this.onDrop = onDrop;

		const { x: lastX, y: lastY } = this.block.getBoundingClientRect();
		this.lastX = lastX;
		this.lastY = lastY;
		this.isDragging = false;

		this.block.addEventListener('mousedown', this.mouseDown.bind(this));
	}

	mouseDown(e) {
		e.preventDefault();
		this.isDragging = true;

		document.addEventListener('mousemove', this.mouseMove.bind(this));
		document.addEventListener('mouseup', this.mouseUp.bind(this), {
			once: true,
		});
	}

	mouseMove(e) {
		if (!this.isDragging) return;

		this.block.style.left = `${e.clientX - this.block.offsetWidth / 2}px`;
		this.block.style.top = `${e.clientY - this.block.offsetHeight / 2}px`;
	}

	mouseUp(e) {
		this.isDragging = false;
		document.removeEventListener('mousemove', this.mouseMove.bind(this));

		const cell = document
			.elementsFromPoint(e.clientX, e.clientY)
			.filter((element) => element.classList.contains('cell'))
			.at(0);

		if (cell && this.onDrop(cell, this.block)) {
			const { x: cellX, y: cellY } = cell.getBoundingClientRect();
			this.block.style.left = `${cellX}px`;
			this.block.style.top = `${cellY}px`;
			this.lastX = cellX;
			this.lastY = cellY;
		} else {
			this.block.style.left = `${this.lastX}px`;
			this.block.style.top = `${this.lastY}px`;
		}
		document.removeEventListener('mouseup', this.mouseUp.bind(this));
	}

	disableDragging() {
		this.block.removeEventListener('mousedown', this.mouseDown);
		this.block.style.pointerEvents = 'none'
	}
}

export class Draggables {
	constructor(shipSelectors, onDrop) {
		this.ships = {};
		this.onDrop = onDrop;
		this.initializeShips(shipSelectors);
	}

	initializeShips(shipSelectors) {
		shipSelectors.forEach((selector) => {
			this.ships[selector] = new Draggable(`.${selector}`, this.onDrop);
		});
	}

	getShip(name) {
		return this.ships[name];
	}

	disableAll() {
		Object.values(this.ships).forEach(ship => ship.disableDragging());
	}
}
