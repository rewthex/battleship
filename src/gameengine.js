import { Player } from "./gameclasses";

export class GameEngine {
  constructor(playerOneName = 'Player One', playerTwoName = 'Player Two') {
    this.players = [
      new Player(playerOneName, 'player-one'),
      new Player(playerTwoName, 'player-two')
    ];
    this.activePlayer = this.players[0];
    this.lastRoundMessage = 'Prepare for BATTLESHIP!';

    this.players[1].gameboard.randomizeShips();
  }

  getPlayers() {
    return this.players;
  }

  getLastRoundMessage() {
    return this.lastRoundMessage;
  }

  randomizeShipsForPlayerTwo() {
    this.players[1].gameboard.randomizeShips();
  }

  placeShip(type, startPosition, vertical) {
    return this.players[0].gameboard.placeShip(type, Number(startPosition), vertical);
  }

  areAllShipsSet() {
    return this.players.every(player => player.gameboard.allShipsSet());
  }

  switchTurn() {
    this.activePlayer = this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getInactivePlayer() {
    return this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  isGameOver() {
    return this.players.some(player => player.gameboard.allShipsSunk());
  }

  playRound(coordinate) {
    const result = this.getInactivePlayer().gameboard.receiveAttack(coordinate);

    if (!result) return;

    const activePlayerName = this.getActivePlayer().name;
    if (result === 'hit') {
      this.lastRoundMessage = `${activePlayerName} struck a ship at ${coordinate}`;
    } else {
      this.lastRoundMessage = `${activePlayerName} missed at ${coordinate}`;
    }

    if (this.isGameOver()) {
      this.lastRoundMessage = `${activePlayerName} has won the game!`;
      return;
    }

    this.switchTurn();
  }
}