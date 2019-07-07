import axios from 'axios';

function humanGame(payload) {
  return axios.post('/api/games/human', payload);
}

function machineGame(payload) {
  return axios.post('/api/games/machine', payload);
}

export default {
  humanGame,
  machineGame
};
