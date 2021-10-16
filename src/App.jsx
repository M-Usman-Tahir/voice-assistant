import React from 'react';
import './stylesheets/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Login, ResetPassword, Signup } from './pages';
import * as ROUTES from './constants/routes';

export const App = () => {
  
  return (
    <Router>
        <Switch>
          <Route path={ROUTES.LOGIN} exact>
            <Login />
          </Route>
          <Route path={ROUTES.SIGN_UP} exact>
            <Signup />
          </Route>
          <Route path={ROUTES.RESET_PASSWORD} exact>
            <ResetPassword />
          </Route>
          <Route path={ROUTES.HOME}>
            <Home />
          </Route>
        </Switch>
    </Router>
  )
}
