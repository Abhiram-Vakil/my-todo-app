// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiqt8SM5plAWUFhqGgxaRnMGxbVZTQiz8",
  authDomain: "todo-app-44bd5.firebaseapp.com",
  projectId: "todo-app-44bd5",
  storageBucket: "todo-app-44bd5.appspot.com",
  messagingSenderId: "705070180641",
  appId: "1:705070180641:web:1f4673c7e7aee4e0af3660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)