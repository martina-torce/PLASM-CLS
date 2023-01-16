import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-D5Ga7uEgylGebV7VLjzJszFZfVOMafI",
  authDomain: "plasm-cls.firebaseapp.com",
  databaseURL: "https://plasm-cls-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plasm-cls",
  storageBucket: "plasm-cls.appspot.com",
  messagingSenderId: "58519493427",
  appId: "1:58519493427:web:377e2ad3246927e61dfc46",
  measurementId: "G-Z4KZ67KF9V"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();