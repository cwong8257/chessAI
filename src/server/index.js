const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

server.listen(8080);

app.use(express.static('dist'));

io.on('connection', (socket) => {
  socket.join('game');

  socket.on('move', (gameState) => {
    socket.to('game').emit('move', gameState);
  });

  socket.on('message', (message) => {
    io.to('game').emit('message', {
      user: 'User',
      time: moment().format('h:mm a'),
      content: message,
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});
