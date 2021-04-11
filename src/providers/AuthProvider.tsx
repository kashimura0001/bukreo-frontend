import React, { createContext, ReactNode, useEffect, useState } from "react";
import firebase from "firebase";
import { UserAuthStatus } from "../utils/constants";

type AuthContextType = {
  status: UserAuthStatus;
  signInEmail: (email: string, password: string) => void;
  signUpEmail: (email: string, password: string) => void;
  signOut: () => void;
};

export const authContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<UserAuthStatus>(UserAuthStatus.Unknown);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setStatus(user ? UserAuthStatus.SignedIn : UserAuthStatus.SignedOut);
    });
  }, []);

  const signInEmail = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signUpEmail = async (email: string, password: string) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  const useProvideAuth = {
    status,
    signInEmail,
    signUpEmail,
    signOut,
  };

  return (
    <authContext.Provider value={useProvideAuth}>
      {children}
    </authContext.Provider>
  );
};
