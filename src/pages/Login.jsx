import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from "react-router-dom";
import { auth } from '../libraries/firebase';
import { signInWithEmailAndPassword, signInWithGoogle } from "../authentication";
import '../stylesheets/Login.css';
import * as ROUTES from '../constants/routes';

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading ] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // trigger a loading screen
      return;
    }
    if (user) history.replace(ROUTES.HOME);
  }, [user, loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login_btn login_google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to={ROUTES.RESET_PASSWORD}>Forgot Password</Link>
        </div>
        <div>
          Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Register</Link> now.
        </div>
      </div>
    </div>
  );
};