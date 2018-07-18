import React from 'react';

import ChessLogic from './ChessLogic';
import Chat from './Chat';
import '../styles/main.scss';

const App = ({ socket }) => (
  <div className="app">
    <ChessLogic socket={socket} />
    <Chat socket={socket} />
  </div>
);

export default App;
