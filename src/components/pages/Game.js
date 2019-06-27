import React from 'react';

import ChessLogic from '../organisms/ChessLogic';
import Chat from '../organisms/Chat';
import socketService from '../../services/socketService';

class Game extends React.Component {
  state = { socket: '' }

  componentWillMount() {
    const { match } = this.props;

    const socket = socketService.connect({
      userId: 'user1',
      gameId: match.params.gameId
    });

    this.setState({
      socket
    });
  }

  render() {
    const { socket } = this.state;

    return (
      <div className="game">
        <ChessLogic socket={socket} />
        <Chat socket={socket} />
      </div>
    );
  }
}

export default Game;
