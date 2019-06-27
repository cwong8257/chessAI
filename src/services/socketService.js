import socketIO from 'socket.io-client';

function connect({ userId, gameId }) {
  return socketIO.connect(`http://localhost:8080?userId=${userId}&gameId=${gameId}`);
}

export default {
  connect
};
