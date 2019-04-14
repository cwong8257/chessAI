import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

import { socketService } from '../../services';
import Engine from '../../engine';

const game = new Chess();
const engine = new Engine(game);

class ChessLogic extends React.Component {
  state = { fen: 'start' };

  componentDidMount() {
    socketService.socket.on('move', (move) => {
      game.move(move);
      const fen = game.fen();
      this.setState({ fen });
    });
  }

  calcWidth = ({ screenWidth, screenHeight }) => Math.min(screenWidth, screenHeight) * 2 / 3;

  makeMove = () => {
    const bestMove = engine.calculateBestMove();
    game.move(bestMove);
    const fen = game.fen();
    this.setState({ fen });
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const { mode } = this.props;

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    const fen = game.fen();

    if (mode === 'human') {
      socketService.makeMove(move);
      this.setState({ fen });
    } else {
      this.makeMove();
    }
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" calcWidth={this.calcWidth} position={fen} onDrop={this.onDrop} />;
  }
}

export default ChessLogic;
