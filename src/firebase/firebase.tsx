import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_WEBAPI,
    authDomain: "mc2-tvz-bb31f.firebaseapp.com",
    projectId: "mc2-tvz-bb31f",
    storageBucket: "mc2-tvz-bb31f.firebasestorage.app",
    messagingSenderId: "573173287760",
    appId: "1:573173287760:web:258f194a3d6d00dd5a7a55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { app, auth, db };
