import React from 'react';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

const chess = new Chess();

class ChessLogic extends React.Component {
  state = { fen: 'start' };

  componentDidMount() {
    const { socket } = this.props;

    socket.on('move', (move) => {
      console.log(move);
      chess.move(move);
      const fen = chess.fen();
      this.setState({ fen });
    });
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const { socket } = this.props;

    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return;

    const fen = chess.fen();

    socket.emit('move', move);
    this.setState({ fen });
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" position={fen} onDrop={this.onDrop} />;
  }
}

export default ChessLogic;
