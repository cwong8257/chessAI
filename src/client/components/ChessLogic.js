import React from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';
import socketIO from 'socket.io-client';

const game = new Chess();

class HumanVsHuman extends React.Component {
  static propTypes = {};

  state = { game, fen: 'start' };

  componentDidMount() {
    const socket = socketIO.connect('http://localhost:8080');
    socket.on('move', (opponent) => {
      console.log(opponent);
      game.load_pgn(opponent.pgn);
      this.setState({ game, fen: opponent.fen });
    });
    this.setState({ socket });
  }

  onDrop = (source, target) => {
    // see if the move is legal
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    // illegal move
    if (move === null) return;

    const fen = game.fen();
    const pgn = game.pgn();
    this.broadcastMove({ pgn, fen });
    this.setState({ game, fen });
  };

  broadcastMove = (gameState) => {
    const { socket } = this.state;
    socket.emit('move', gameState);
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" width={320} position={fen} onDrop={this.onDrop} />;
  }
}

export default HumanVsHuman;
