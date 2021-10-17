import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyALOaPp8f4eq0eUPBEFFMTpMC0yNPgVMPI",
  authDomain: "react-firebase-authentic-3a98a.firebaseapp.com",
  projectId: "react-firebase-authentic-3a98a",
  storageBucket: "react-firebase-authentic-3a98a.appspot.com",
  messagingSenderId: "966650375341",
  appId: "1:966650375341:web:5182823ee6f0973176ea24",
  measurementId: "G-E3RW0BXGJG"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

export { auth, db };