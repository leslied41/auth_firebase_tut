import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "../../firebase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };
  const reset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email);
  };
  const updateUerPassword = (password) => {
    return updatePassword(currentUser, password);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      //console.log("new user");
    });
    //so this function can detect if user has signed in
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    reset,
    updateUserEmail,
    updateUerPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {/* only after finish checking if there is user, children would be rendered inside */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
