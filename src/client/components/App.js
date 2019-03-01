import React from 'react';

import ChessLogic from './ChessLogic';
import Chat from './Chat';
import '../styles/main.scss';

class App extends React.Component {
  state = { mode: 'human' }

  handleChange = (e) => {
    this.setState({ mode: e.target.value });
  }

  render() {
    const { mode } = this.state;

    return (
      <div className="app">
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


export default App;
