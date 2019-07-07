import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

import Engine from '../../engine';

const chess = new Chess();
const engine = new Engine(chess);

class MachineGamwe extends React.Component {
  state = {
    fen: 'start'
  };

  onDrop = async ({ sourceSquare, targetSquare }) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    this.setState({
      fen: chess.fen()
    });

    const machineMove = await engine.calculateBestMove();

    chess.move(machineMove);

    this.setState({
      fen: chess.fen()
    });
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" position={fen} onDrop={this.onDrop} />;
  }
}

export default MachineGamwe;
