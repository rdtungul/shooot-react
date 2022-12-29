// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// start adding the firebase db
import { getFirestore } from "firebase/firestore";
// start authenticating the app on the google cloud
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBREnn-JwJzCJxZX2PIFAwJ56aVzwP5gXk",
  authDomain: "blog-react-8fb6b.firebaseapp.com",
  projectId: "blog-react-8fb6b",
  storageBucket: "blog-react-8fb6b.appspot.com",
  messagingSenderId: "494016204784",
  appId: "1:494016204784:web:ef021ca2b3e45e6b9d9735",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// exporting the firebase db
export const db = getFirestore(app);

// setting up the firebase authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
