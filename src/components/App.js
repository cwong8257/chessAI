import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from '../router/AppRouter';
import Header from '../common/Header';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}


export default App;
