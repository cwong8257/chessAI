import React from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js';
import Chessboard from 'chessboardjsx';

const game = new Chess();

class HumanVsHuman extends React.Component {
  // static propTypes = { socket: PropTypes.objectOf };

  constructor(props) {
    super(props);
    this.state = { game, fen: 'start' };
  }

  componentDidMount() {
    const { socket } = this.props;

    socket.on('move', (opponent) => {
      game.load_pgn(opponent.pgn);
      this.setState({ game, fen: opponent.fen });
    });
  }

  onDrop = (source, target) => {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    if (move === null) return;

    const fen = game.fen();
    const pgn = game.pgn();
    this.broadcastMove({ pgn, fen });
    this.setState({ game, fen });
  };

  broadcastMove = (gameState) => {
    const { socket } = this.props;
    socket.emit('move', gameState);
  };

  render() {
    const { fen } = this.state;

    return <Chessboard id="chessBoard" width={400} position={fen} onDrop={this.onDrop} />;
  }
}

export default HumanVsHuman;
