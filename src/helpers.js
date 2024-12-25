export const createBoards = () => {
	const playerBoard = document.getElementById('player-board')
	const computerBoard = document.getElementById('computer-board')
	
	for (let i = 0; i < 100; i++) {
		const playerCell = document.createElement('div');
		playerCell.classList.add('cell');
		playerCell.setAttribute('id', i);
		playerBoard.appendChild(playerCell);

		const computerCell = document.createElement('div');
		computerCell.classList.add('cell');
		computerCell.setAttribute('id', i);
		computerBoard.appendChild(computerCell);
	}
};
