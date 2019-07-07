import React from 'react';
import { connect } from 'react-redux';

import HumanGame from '../organisms/HumanGame';
import MachineGame from '../organisms/MachineGame';
import Chat from '../organisms/Chat';
import socketService from '../../services/socketService';
import { MODES } from '../../constants';

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
    const { mode } = this.props;
    const game = {
      [MODES.HUMAN]: <HumanGame socket={socket} />,
      [MODES.MACHINE]: <MachineGame />
    }[mode];
    const chat = mode === MODES.HUMAN && <Chat socket={socket} />;

    return (
      <div className="game">
        {game}
        {chat}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  mode: game.mode
});

export default connect(mapStateToProps)(Game);
