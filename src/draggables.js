export class Draggable {
	constructor(selector, onDrop) {
		this.block = document.getElementById(selector);
		this.onDrop = onDrop;

		const { x: lastX, y: lastY } = this.block.getBoundingClientRect();
		this.lastX = lastX;
		this.lastY = lastY;
		this.offset = { x: 0, y: 0 };
		this.isDragging = false;

		this.block.addEventListener('mousedown', this.mouseDown.bind(this));
	}

	mouseDown(e) {
		e.preventDefault();
		this.isDragging = true;

		const block = this.block.getBoundingClientRect();
		this.offset.x = e.clientX - block.left;
		this.offset.y = e.clientY - block.top;

		document.addEventListener('mousemove', this.mouseMove.bind(this));
		document.addEventListener('mouseup', this.mouseUp.bind(this), {
			once: true,
		});
	}

	mouseMove(e) {
		if (!this.isDragging) return;
		this.block.style.position = 'absolute';

		this.block.style.left = `${e.clientX - this.offset.x}px`;
		this.block.style.top = `${e.clientY - this.offset.y}px`;
	}

	mouseUp(e) {
		this.isDragging = false;
		document.removeEventListener('mousemove', this.mouseMove.bind(this));

		let { x, y } = this.block.getBoundingClientRect();

		const cell = document
			.elementsFromPoint(x + 15, y + 15)
			.filter((element) => element.classList.contains('cell'))
			.at(0);

		if (cell && this.onDrop(cell, this.block)) {
			const { x: cellX, y: cellY } = cell.getBoundingClientRect();
			this.block.style.left = `${cellX}px`;
			this.block.style.top = `${cellY}px`;
			this.lastX = cellX;
			this.lastY = cellY;
			this.block.dataset.set = 'true';
		} else {
			this.block.style.position = '';
			this.block.style.left = `${this.lastX}px`;
			this.block.style.top = `${this.lastY}px`;
			this.block.dataset.set = 'false';
		}
		document.removeEventListener('mouseup', this.mouseUp.bind(this));
	}

	disableDragging() {
		this.block.removeEventListener('mousedown', this.mouseDown);
		this.block.style.pointerEvents = 'none';
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
			this.ships[selector] = new Draggable(selector, this.onDrop);
		});
	}

	getShip(name) {
		return this.ships[name];
	}

	disableAll() {
		Object.values(this.ships).forEach((ship) => ship.disableDragging());
	}
}
