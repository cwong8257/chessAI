import axios from 'axios';

export default (token) => {
  if (token) {
    axios.defaults.headers.authorization = token;
  } else {
    delete axios.defaults.headers.authorization;
  }
};
