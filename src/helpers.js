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

export const updateBoard = (player, gameboard) => {
	const boardToUpdate = document.getElementById(`${player}-board`)
	boardToUpdate.innerHTML = ''

	for (let i = 0; i < 100; i++) {
		const cellDiv = document.createElement('div');
		cellDiv.classList.add('cell');
		if (typeof gameboard[i] === 'string') {
			cellDiv.classList.add(gameboard[i]);
		}
		cellDiv.dataset.id = i;
		boardToUpdate.append(cellDiv);
	}
}