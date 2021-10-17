import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../libraries/firebase";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../authentication";
import "../stylesheets/Signup.scss";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <span className="login__text">Sign up</span>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Sign up
        </button>
        <div className="google-btn" onClick={signInWithGoogle}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">Sign in with Google</p>
        </div>
        <div>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>{" "}
          now.
        </div>
      </div>
      <div className="signup__banner">
        <video src="./images/siri-motion.mp4" autoPlay loop></video>
      </div>
    </div>
  );
};
