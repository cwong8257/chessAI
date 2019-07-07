import React from 'react';
import { connect } from 'react-redux';

import { initiateHumanGame, initiateMachineGame } from '../../actions/gameActions';

class Home extends React.Component {
  state = {}

  handlePlayHuman = async (e) => {
    const { initiateHumanGame } = this.props;

    await initiateHumanGame();

    const { gameId, history } = this.props;

    history.push(`/${gameId}`);
  }

  handlePlayMachine = async (e) => {
    const { initiateMachineGame } = this.props;

    await initiateMachineGame();

    const { gameId, history } = this.props;

    history.push(`/${gameId}`);
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div className="col-12 mb-3">
            <h2 className="text-center">Play</h2>
          </div>
          <div className="col-12 col-sm-6 text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.handlePlayHuman}
            >
              Human
            </button>
          </div>
          <div className="col-12 col-sm-6 text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.handlePlayMachine}
            >
              Machine
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  gameId: game.gameId
});

const mapDispatchToProps = {
  initiateHumanGame,
  initiateMachineGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
