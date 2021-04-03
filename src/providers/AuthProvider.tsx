import React, { createContext, ReactNode, useEffect, useState } from "react";
import firebase from "../lib/firebase";

type AuthContextType = {
  loading: boolean;
  user: firebase.User | null;
  signInEmail: (email: string, password: string) => void;
  signUpEmail: (email: string, password: string) => void;
  signOut: () => void;
};

export const authContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
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
    loading,
    user,
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
