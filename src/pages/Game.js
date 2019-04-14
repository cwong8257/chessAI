import React from 'react';

import ChessLogic from '../components/ChessLogic';
import Chat from '../components/Chat';

class Game extends React.Component {
  state = { mode: 'human' }

  handleChange = (e) => {
    this.setState({ mode: e.target.value });
  }

  render() {
    const { mode } = this.state;

    return (
      <div className="game">
        <select defaultValue={mode} onChange={this.handleChange}>
          <option value="human">Human</option>
          <option value="computer">Computer</option>
        </select>
        <ChessLogic />
        <Chat />
      </div>
    );
  }
}


export default Game;
