import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../components/pages/Home';
import Game from '../components/pages/Game';

function AppRouter() {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
    </div>
  );
}

export default AppRouter;
