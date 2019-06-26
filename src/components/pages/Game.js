import React from 'react';

import ChessLogic from '../organisms/ChessLogic';
import Chat from '../organisms/Chat';

class Game extends React.Component {
  state = { mode: 'human' }

  render() {
    const { mode } = this.state;

    return (
      <div className="game">
        <ChessLogic mode={mode} />
        <Chat />
      </div>
    );
  }
}


export default Game;
