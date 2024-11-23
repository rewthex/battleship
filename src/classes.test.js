import { Ship, Gameboard, Player } from './classes';

describe('ship', () => {
	const submarine = new Ship('submarine', 2);

	test('returns the length', () => {
		expect(submarine.length).toBe(2);
	});

	test('can be hit/checked if sunk', () => {
		submarine.hit();
		expect(submarine.isSunk()).toBe(false);
		submarine.hit();
		expect(submarine.isSunk()).toBe(true);
	});
});

describe('gameboard', () => {
	const gameboard = new Gameboard();

	test('initializes an empty gameboard', () => {
		expect(gameboard.board.length).toBe(100);
	});

	test('places ships', () => {
		gameboard.placeShip('submarine', 0, false);
		expect(gameboard.board[0].name).toBe('submarine');
		expect(gameboard.board[1].name).toBe('submarine');
		gameboard.placeShip('destroyer', 5, true);
		expect(gameboard.board[5].name).toBe('destroyer');
		expect(gameboard.board[15].name).toBe('destroyer');
	});

	test('receives attacks', () => {
		gameboard.receiveAttack(0);
		expect(gameboard.board[0].isSunk()).toBe(false);
		gameboard.receiveAttack(1);
		expect(gameboard.board[0].isSunk()).toBe(false);
		gameboard.receiveAttack(2);
		expect(gameboard.board[0].isSunk()).toBe(true);
	});

	test('keeps track of missed shots', () => {
		gameboard.receiveAttack(95);
		gameboard.receiveAttack(96);
		gameboard.receiveAttack(97);
		gameboard.receiveAttack(98);
		expect(gameboard.missedShots.length).toBe(4);
	});
});

describe('player', () => {
	const humanPlayer = new Player('Aaron', 'Human');
	const computerPlayer = new Player('Hal', 'Computer');

	expect(humanPlayer.name).toBe('Aaron');
	expect(humanPlayer.type).toBe('Human');

	expect(computerPlayer.name).toBe('Hal');
	expect(computerPlayer.type).toBe('Computer');
});
