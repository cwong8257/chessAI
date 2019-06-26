import React from 'react';

import gameService from '../../services/gameService';

class Home extends React.Component {
  state = {}

  handlePlayHuman = async (e) => {
    const { data } = await gameService.humanGame();
    const { history } = this.props;
    history.push(`/${data.gameId}`);
  }

  handlePlayMachine = (e) => {
    // call endpoint for playing Machine
    // route to game
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div className="col-12 mb-3">
            <h2 className="text-center">Play</h2>
          </div>
          <div className="col-12 col-sm-6 text-center">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handlePlayHuman}>Human</button>
          </div>
          <div className="col-12 col-sm-6 text-center">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handlePlayMachine}>Machine</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
