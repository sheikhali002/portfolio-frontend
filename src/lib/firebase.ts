// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF3F4VXGvjrz8aIMkCAEMrD-ShWCqYdRc",
  authDomain: "ali-manage.firebaseapp.com",
  projectId: "ali-manage",
  storageBucket: "ali-manage.firebasestorage.app",
  messagingSenderId: "852836476851",
  appId: "1:852836476851:web:d53a05bc85d624c5868dc6",
  measurementId: "G-LH86PD8ZYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);