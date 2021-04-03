import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config/firebase";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
