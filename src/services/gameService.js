import axios from 'axios';

function humanGame(payload) {
  return axios.post('/api/games/human', payload);
}

export default {
  humanGame
};
