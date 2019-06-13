import axios from 'axios';

function login(payload) {
  return axios.post('/api/login', payload);
}

function register(payload) {
  return axios.post('/api/register', payload);
}

export default {
  login,
  register
};
