require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const userRoutes = require('./routes/api/users');
const gameRoutes = require('./routes/api/games');
const configurePassport = require('./config/passport');
const configureSocket = require('./config/socket');

const app = express();
const server = http.Server(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chessAI');

app.use(passport.initialize());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

configurePassport(passport);
configureSocket(server);

app.use('/api', userRoutes);
app.use('/api/games', gameRoutes);
