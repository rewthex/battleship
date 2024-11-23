import { Player } from './classes';
import {
	gameInfo,
	gameBoards,
	optionContainer,
	buttonContainer,
} from './gamearea';
import { flip } from './gamehelpers';
import './styles.css'

const gameController = () => {
  const humanPlayer = new Player('Aaron', 'human')
  const computerPlayer = new Player('Hal', 'computer')

  return { humanPlayer, computerPlayer }
}

const game = gameController();

const screenController = () => {
  document.body.append(
    gameInfo(),
    gameBoards('player-one', 'player-two'),
    optionContainer(),
    buttonContainer()
  );
  const flipButton = document.querySelector('#flip-button')
  flipButton.addEventListener('click', flip)
}

const screen = screenController();