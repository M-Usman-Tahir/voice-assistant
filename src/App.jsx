import React from 'react';
import './stylesheets/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Login, Signup } from './pages';
import * as ROUTES from './constants/routes';

export const App = () => {
  
  return (
    <Router>
        <nav>
          <ul>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.LOGIN}>Login</Link>
            </li>
            <li>
              <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={ROUTES.LOGIN} exact>
            <Login />
          </Route>
          <Route path={ROUTES.SIGN_UP} exact>
            <Signup />
          </Route>
          <Route path={ROUTES.HOME}>
            <Home />
          </Route>
        </Switch>
    </Router>
  )
}
