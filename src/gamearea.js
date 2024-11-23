export const gameInfo = () => {
	const gameInfoDiv = document.createElement('div');
	gameInfoDiv.classList.add('game-info');
	
	const turnDisplayPara = document.createElement('p');
	const turnDisplaySpan = document.createElement('span');
	turnDisplaySpan.innerText = 'Turn: '
	turnDisplaySpan.setAttribute('id', 'turn-display');
	turnDisplayPara.appendChild(turnDisplaySpan);
	
	const infoPara = document.createElement('p');
	const infoSpan = document.createElement('span');
	infoSpan.innerText = 'Info: '
	infoSpan.setAttribute('id', 'info');
	infoPara.appendChild(infoSpan);

	gameInfoDiv.append(turnDisplayPara, infoPara);

	return gameInfoDiv;
};

export const gameBoards = (playerOne, playerTwo) => {
	const gamesBoardDiv = document.createElement('div');
	gamesBoardDiv.classList.add('gamesboard-container');
  gamesBoardDiv.append(createBoard(playerOne), createBoard(playerTwo))

	return gamesBoardDiv;
};

const createBoard = (player) => {
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

export const optionContainer = () => {
	const optionContainerDiv = document.createElement('div');
	optionContainerDiv.classList.add('option-container');

	const destroyerDiv = document.createElement('div');
	destroyerDiv.classList.add('destroyer-preview', 'destroyer');
	destroyerDiv.setAttribute('draggable', 'true');

	const submarineDiv = document.createElement('div');
	submarineDiv.classList.add('submarine-preview', 'submarine');
	submarineDiv.setAttribute('draggable', 'true');

	const cruiserDiv = document.createElement('div');
	cruiserDiv.classList.add('cruiser-preview', 'cruiser');
	cruiserDiv.setAttribute('draggable', 'true');

	const battleshipDiv = document.createElement('div');
	battleshipDiv.classList.add('battleship-preview', 'battleship');
	battleshipDiv.setAttribute('draggable', 'true');

	const carrierDiv = document.createElement('div');
	carrierDiv.classList.add('carrier-preview', 'carrier');
	carrierDiv.setAttribute('draggable', 'true');

	optionContainerDiv.append(
		destroyerDiv,
		submarineDiv,
		cruiserDiv,
		battleshipDiv,
		carrierDiv
	);

	return optionContainerDiv;
};

export const buttonContainer = () => {
	const buttonContainerDiv = document.createElement('div');
	buttonContainerDiv.classList.add('button-container');

	const flipButton = document.createElement('button');
	flipButton.setAttribute('id', 'flip-button');
	flipButton.innerText = 'FLIP';

	const startButton = document.createElement('button');
	startButton.setAttribute('id', 'start-button');
	startButton.innerText = 'START';

	buttonContainerDiv.append(flipButton, startButton);

	return buttonContainerDiv;
};
