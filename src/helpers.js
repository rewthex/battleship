export const renderBoard = (player, gameboard = '', humanPlayer) => {
	const width = 10;

	const gameBoardContainer = document.createElement('div');
	gameBoardContainer.classList.add('game-board');
	gameBoardContainer.setAttribute('id', player);

	for (let i = 0; i < width * width; i++) {
		const cellDiv = document.createElement('div');
		cellDiv.classList.add('cell');
		cellDiv.dataset.id = i;
		gameBoardContainer.append(cellDiv);
	}

	return gameBoardContainer;
};
