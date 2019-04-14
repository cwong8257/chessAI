import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Game from '../pages/Game';

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/game" component={Game} />
    </Switch>
  );
}

export default AppRouter;
