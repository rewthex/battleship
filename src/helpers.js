export const renderBoard = (player, gameboard = '') => {
	const width = 10;

	const gameBoardContainer = document.createElement('div');
	gameBoardContainer.classList.add('game-board');
	gameBoardContainer.setAttribute('id', player);

	for (let i = 0; i < width * width; i++) {
		const block = document.createElement('div');
		block.classList.add('block');
		if (gameboard[i] !== undefined) {
			if (gameboard[i]['name']) {
				block.classList.add(gameboard[i]['name'])
			} else {
				block.classList.add(gameboard[i])
			}
		}
		block.id = i;
		gameBoardContainer.append(block);
	}

	return gameBoardContainer;
};
