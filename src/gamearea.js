export const gameBoards = () => {
	const gamesBoardDiv = document.createElement('div');
	gamesBoardDiv.classList.add('gamesboard-container');
  gamesBoardDiv.append(renderBoard('player-one'), renderBoard('player-two'))

	return gamesBoardDiv;
};

export const renderBoard = (player, gameboard = '') => {
	const width = 10;

	const gameBoardContainer = document.createElement('div');
	gameBoardContainer.classList.add('game-board');
	gameBoardContainer.setAttribute('id', player)

	for (let i = 0; i < width * width; i++) {
		
		const block = document.createElement('div');
		block.classList.add('block');
		block.id = i;
		gameBoardContainer.append(block);
	}

	return gameBoardContainer;
}