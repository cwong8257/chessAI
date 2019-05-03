import React from 'react';
import { Route } from 'react-router-dom';

import Game from '../components/pages/Game';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';

function AppRouter() {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default AppRouter;
