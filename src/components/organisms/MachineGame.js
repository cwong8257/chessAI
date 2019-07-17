import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

let chessWorker;
const chess = new Chess();

class MachineGame extends React.Component {
  state = {
    fen: 'start'
  };

  componentWillMount = () => {
    chessWorker = new Worker('chess.js');

    chessWorker.onmessage = (e) => {
      switch (e.data.type) {
        case 'move': {
          const move = e.data.payload;

          chess.move(move);

          if (!move) return;

          const fen = chess.fen();
          this.setState({ fen });
          break;
        }

        default:
          break;
      }
    };
  }

  makeComputerMove = () => {
    chessWorker.postMessage({
      type: 'makeComputerMove',
      payload: { depth: 2, isWhite: false }
    });
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const moveDetails = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    };

    const move = chess.move(moveDetails);

    if (!move) return;

    chessWorker.postMessage({
      type: 'move',
      payload: moveDetails
    });

    const fen = chess.fen();

    this.setState({ fen }, this.makeComputerMove);
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" position={fen} onDrop={this.onDrop} />;
  }
}

export default MachineGame;
