import React from 'react';

class Home extends React.Component {
  state = {}

  handleOnClickHuman = (e) => {
    // call endpoint for playing Human
    // route to game
  }

  handleOnClickMachine = (e) => {
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
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleOnClickHuman}>Human</button>
          </div>
          <div className="col-12 col-sm-6 text-center">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleOnClickMachine}>Machine</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
