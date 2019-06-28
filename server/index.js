require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const { Chess } = require('chess.js');


const userRoutes = require('./routes/api/users');
const gameRoutes = require('./routes/api/games');
const configurePassport = require('./config/passport');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chessAI');

app.use(passport.initialize());
configurePassport(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api/games', gameRoutes);

const server = http.Server(app);
const io = socketIO(server);

server.listen(process.env.PORT || 8080);

let userCount = 0;
const users = {};
const games = {};

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
