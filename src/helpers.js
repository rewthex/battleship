export const renderBoard = (player, gameboard = '', humanPlayer) => {
	const width = 10;

	const gameBoardContainer = document.createElement('div');
	gameBoardContainer.classList.add('game-board');
	gameBoardContainer.setAttribute('id', player);

	for (let i = 0; i < width * width; i++) {
		const cellButton = document.createElement('button');
		cellButton.classList.add('cell');
		if (gameboard[i] !== undefined) {
			if (humanPlayer)
				cellButton.classList.add(gameboard[i]['name'] ?? gameboard[i]);
			if (!humanPlayer && !gameboard[i]['name'])
				cellButton.classList.add(gameboard[i])
		}
		cellButton.dataset.id = i;
		gameBoardContainer.append(cellButton);
	}

	return gameBoardContainer;
};
