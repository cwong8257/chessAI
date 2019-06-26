import socketIO from 'socket.io-client';

class ChessSocket {
  constructor({ userId, gameId }) {
    this.socket = socketIO.connect(`http://localhost:8080?userId=${userId}gameId=${gameId}`);
  }

  makeMove(move) {
    this.socket.emit('move', move);
  }
}

export default ChessSocket;
