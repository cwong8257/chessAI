const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

let userCount = 0;

server.listen(8080);

app.use(express.static('dist'));

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
