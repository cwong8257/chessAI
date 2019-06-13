require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/api/users');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chessAI');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);

const server = http.Server(app);
const io = socketIO(server);

let userCount = 0;

server.listen(process.env.PORT || 8080);

io.on('connection', (socket) => {
  socket.join('game');
  userCount++;
  console.log('connected', userCount);

  socket.on('move', (gameState) => {
    socket.to('game').emit('move', gameState);
  });

  socket.on('message', ({ user, content }) => {
    io.to('game').emit('message', {
      user,
      time: moment().format('h:mm a'),
      content,
    });
  });

  socket.on('disconnect', () => {
    userCount--;
    console.log('disconnected', userCount);
  });
});
