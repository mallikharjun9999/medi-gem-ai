// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2L7ZKtxfd81Iu1KgZpl7YLS98XDbzts4",
  authDomain: "medigem-ai-14f78.firebaseapp.com",
  projectId: "medigem-ai-14f78",
  storageBucket: "medigem-ai-14f78.appspot.com",
  messagingSenderId: "700074153740",
  appId: "1:700074153740:web:726ae66c8dee334ddbdb29"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
