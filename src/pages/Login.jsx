import React, { useState, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useHistory } from "react-router-dom";
import { auth } from '../libraries/firebase';
import { signInWithEmailAndPassword, signInWithGoogle } from "../authentication";
import '../stylesheets/Login.scss';
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
     <div className="login__banner">
     <img src="./images/siri.png" alt="siri" />
     </div>
      <div className="login__container">
        <span className='login__text'>Login</span>
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

        <div className="google-btn" onClick={signInWithGoogle}>
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p className="btn-text">Sign in with Google</p>
</div>
        <div className="login__links">
          <Link className="link" to={ROUTES.RESET_PASSWORD}>Forgot Password</Link>
        </div>
        <div className="login__links">
          Don&apos;t have an account? <Link className="link" to={ROUTES.SIGN_UP}>Register</Link> now.
        </div>
      </div>
    </div>
  );
};