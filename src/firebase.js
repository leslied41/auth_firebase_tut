import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVi2uLDpGRsKdFRH5UepdRG7wmD65oBlQ",
  authDomain: "auth-tut-1-eda03.firebaseapp.com",
  projectId: "auth-tut-1-eda03",
  storageBucket: "auth-tut-1-eda03.appspot.com",
  messagingSenderId: "599623033087",
  appId: "1:599623033087:web:f344e16cbac5e86c22ecca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
};
