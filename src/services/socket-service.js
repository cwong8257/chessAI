import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8080');

function makeMove(move) {
  return socket.emit('move', move);
}

export const socketService = {
  socket,
  makeMove,
};
