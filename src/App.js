import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './configureStore';
import AppRouter from './router/AppRouter';
import Header from './components/organisms/Header';

const preloadedState = {};

const store = configureStore(preloadedState);

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}


export default App;
