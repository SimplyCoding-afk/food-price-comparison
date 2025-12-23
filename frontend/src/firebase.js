import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDopvt-uKzN2zBhCqkvrGUFspWSodSeLlE",
  authDomain: "foodcompare-79671.firebaseapp.com",
  projectId: "foodcompare-79671",
  storageBucket: "foodcompare-79671.firebasestorage.app",
  messagingSenderId: "550444197690",
  appId: "1:550444197690:web:8a4978b5175e7265279203",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
