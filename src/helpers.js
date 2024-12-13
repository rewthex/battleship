export const renderBoard = (player, gameboard, gameover) => {
	const width = 10;

	const gameBoardContainer = document.createElement('div');
	gameBoardContainer.classList.add('game-board');
	gameBoardContainer.setAttribute('id', player);

	for (let i = 0; i < width * width; i++) {
		const cellDiv = document.createElement('div');
		cellDiv.classList.add('cell');
		if (typeof gameboard[i] === 'string') {
			cellDiv.classList.add(gameboard[i]);
		}
		cellDiv.dataset.id = i;
		gameBoardContainer.append(cellDiv);
	}

	return gameBoardContainer;
};
