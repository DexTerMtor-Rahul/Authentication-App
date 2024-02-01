// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-4dab3.firebaseapp.com",
  projectId: "auth-app-4dab3",
  storageBucket: "auth-app-4dab3.appspot.com",
  messagingSenderId: "157018414913",
  appId: "1:157018414913:web:2f4a230089256b285c4bc0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
