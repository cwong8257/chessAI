import React, { Component } from 'react';
import Chessboard from 'chessboardjsx';
import ChessLogic from './ChessLogic';

import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ChessLogic>
          {({ position, selectedSquares, onDrop }) => (
            <Chessboard
              id="chessBoard"
              width={320}
              position={position}
              selectedSquares={selectedSquares}
              onDrop={onDrop}
            />
          )}
        </ChessLogic>
      </div>
    );
  }
}

export default App;
