import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { logOut } from "../authentication";
import { auth } from "../libraries/firebase";
import '../stylesheets/Home.scss';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Siriwave from 'react-siriwave';
import { fetchUserName } from '../services';


export const Home = () => {

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/login");
    const getUserName = async () => {
      const name = await fetchUserName(user);
      setName(name);
    };
    getUserName();
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