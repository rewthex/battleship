let angle = 0;

export const flip = () => {
	const optionContainer = document.querySelector('.option-container');
	const optionShips = Array.from(optionContainer.children);
	angle = angle === 0 ? 90 : 0;
	optionShips.forEach(
		(optionShip) => (optionShip.style.transform = `rotate(${angle}deg`)
	);
};
