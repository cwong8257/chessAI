import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

import socketService from '../../services/socketService';

const game = new Chess();

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

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    console.log(move);

    if (move === null) return;

    const fen = game.fen();

    socketService.makeMove(move);
    this.setState({ fen });
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" calcWidth={this.calcWidth} position={fen} onDrop={this.onDrop} />;
  }
}

export default ChessLogic;
