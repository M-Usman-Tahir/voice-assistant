import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import { sendPasswordResetEmail } from "../authentication";
import { auth } from '../libraries/firebase';
import '../stylesheets/ResetPassword.scss';

export const ResetPassword = () => {

  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/");
  }, [user, loading]);

  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </button>
        <div>
          Don&apos;t have an account? <Link to="/signup">Register</Link> now.
        </div>
      </div>
    </div>
  );
};