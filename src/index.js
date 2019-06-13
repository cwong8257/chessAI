import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.render(<App />, document.getElementById('root'));
