import { POINTS } from '../constants';

class Engine {
  constructor(game) {
    this.game = game;
  }

  async calculateBestMove() {
    const { game } = this;
    let bestMove;
    let bestEvaluation = Infinity;
    const moves = game.moves();

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      game.move(move);
      const evaluation = this.evaluate();

      if (bestEvaluation > evaluation) {
        bestEvaluation = evaluation;
        bestMove = move;
      }

      game.undo();
    }

    return bestMove;
  }

  evaluate() {
    let sum = 0;
    const { game } = this;
    const squares = game.SQUARES;

    squares.forEach((square) => {
      const piece = game.get(square);

      if (piece === null) return;

      const { type, color } = piece;
      const value = POINTS[type];

      if (color === 'w') {
        sum += value;
      } else {
        sum -= value;
      }
    });

    return sum;
  }
}

export default Engine;
