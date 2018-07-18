import React, { Component } from 'react';

import ChessLogic from './ChessLogic';
import Chat from './Chat';

import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <ChessLogic />
        <Chat />
      </div>
    );
  }
}

export default App;
