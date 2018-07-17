import React from 'react';
import PropTypes from 'prop-types';
import Chess from 'chess.js';

const game = new Chess();

class HumanVsHuman extends React.Component {
  static propTypes = { children: PropTypes.func.isRequired };

  state = { fen: 'start', selectedSquares: [], myPosition: {} };

  onDrop = (source, target) => {
    // see if the move is legal
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });

    // illegal move
    if (move === null) return;

    console.log(game.pgn());

    this.setState({ fen: game.fen() });
  };

  getPosition = position => this.setState({ myPosition: position });

  render() {
    const { fen, selectedSquares, myPosition } = this.state;
    const { children } = this.props;

    return children({
      position: fen,
      selectedSquares,
      onDrop: this.onDrop,
    });
  }
}

export default HumanVsHuman;
