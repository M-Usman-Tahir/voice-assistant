import { auth, db } from "../libraries/firebase"

const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await auth.createUserWithEmailAndPassword(email, password);
        const user = response.user;
        await db.collection('users').add({
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Password reset link sent!');
    } catch (error) {
        alert(error.message);
    }
};

const logOut = () => {
    auth.signOut();
};

export { signInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordResetEmail, logOut };