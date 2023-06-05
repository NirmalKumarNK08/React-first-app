import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSCbU6QMQlx4L8in4JJzDJFMBQpZKjwbA",
  authDomain: "react-first-app-7d59b.firebaseapp.com",
  projectId: "react-first-app-7d59b",
  storageBucket: "react-first-app-7d59b.appspot.com",
  messagingSenderId: "314011919041",
  appId: "1:314011919041:web:5b05e6907e3e58f2076a40",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
