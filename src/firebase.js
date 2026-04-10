import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUWDerP2qCBWhXNdE3d_ylHuIwEL3MAdw",
  authDomain: "velora-23287.firebaseapp.com",
  projectId: "velora-23287",
  storageBucket: "velora-23287.firebasestorage.app",
  messagingSenderId: "995212921787",
  appId: "1:995212921787:web:d0cbd94f4c2533f7ef929e",
  measurementId: "G-04SEMSH2DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firestore
export const db = getFirestore(app);
export default app;
