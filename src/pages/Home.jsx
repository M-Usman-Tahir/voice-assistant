import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { logOut } from "../authentication";
import { auth, db } from "../libraries/firebase";
import '../stylesheets/Home.scss';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Siriwave from 'react-siriwave';


export const Home = () => {

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div>
        <p className='transcript'>{transcript}</p>
        <p>{listening? <Siriwave style="ios9" />:null}</p>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};