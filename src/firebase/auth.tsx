import { GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, updatePassword,
    signInWithPopup,
    User
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        auth.useDeviceLanguage();
        await doSendEmailLink(user);
    } catch (error) {
        console.log(error);
    }
}

export const doSendEmailLink = async (user: User) => {
    return sendEmailVerification(user);
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    //console.log("doSignInWithEmailAndPassword");
    auth.useDeviceLanguage();
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    //Todo, try to see if langguge can be set from the browser session storage
    auth.useDeviceLanguage();
    const result = await signInWithPopup(auth, provider);
    //console.log("google(): " + result.user);
    return result;
}

export const doSignOut = () => {
    localStorage.clear();
    return auth.signOut();
}

export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
    return updatePassword(auth.currentUser as User, password);
};

