import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Game from '../components/pages/Game';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';

function AppRouter() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/:gameId" component={Game} />
      </Switch>
    </div>
  );
}

export default AppRouter;
