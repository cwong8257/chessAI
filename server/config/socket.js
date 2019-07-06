const socketIO = require('socket.io');
const moment = require('moment');
const { Chess } = require('chess.js');

let userCount = 0;
const users = {};
const games = {};

module.exports = (server) => {
  const io = socketIO(server);

  server.listen(process.env.PORT || 8080);

  // log count of users
  io.use((socket, next) => {
    console.log('connected', ++userCount);
    next();
  });

  // connect to game
  io.use((socket, next) => {
    const { gameId } = socket.handshake.query;

    if (!games[gameId]) {
      games[gameId] = {
        player1: 'player1',
        chess: new Chess()
      };
      return next();
    }

    games[gameId].player2 = 'player2';

    return next();
  });

  io.on('connection', (socket) => {
    const { gameId } = socket.handshake.query;

    socket.join(gameId);

    socket.on('move', (move) => {
      games[gameId].chess.move(move);
      socket.to(gameId).emit('move', move);
    });

    socket.on('message', ({ user, content }) => {
      const time = moment().format('h:mm a');

      socket.to(gameId).emit('message', {
        user,
        time,
        content,
      });
    });

    socket.on('loadGame', () => {
      const pgn = games[gameId].chess.pgn();

      socket.emit('sendGame', pgn);
    });

    socket.on('disconnect', () => {
      const room = games[gameId];

      console.log('disconnected', --userCount);
    });
  });
};
