// firebase-config.js
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuZJ6mXQqaYh2sB3qN3XiYmvlIfoaKLfs",
  authDomain: "okapitapapp.firebaseapp.com",
  projectId: "okapitapapp",
  storageBucket: "okapitapapp.appspot.com",
  messagingSenderId: "112314690380",
  appId: "1:112314690380:web:3532c71d2f01cd3d147de9",
  measurementId: "G-5MQ1357RH6"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth, analytics };