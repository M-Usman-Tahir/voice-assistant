import firebase from "firebase/compat/app";
import { auth, db } from "../libraries/firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const response = await auth.signInWithPopup(googleProvider);
        const user = response.user;
        const query = await db.collection('users').where("uid", "==", user.uid).get();
        if (query.docs.length === 0) {
            await db.collection('users').add({
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            });
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

export { signInWithGoogle };