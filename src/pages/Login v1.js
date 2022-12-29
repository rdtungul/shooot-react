import React from "react";
// importing the firebase-config for the user auth (google auth)
import { auth, provider } from "../firebase-config";
// importing firebase package to enable pop-up
import { signInWithPopup } from "firebase/auth";
// adding react-router-dom to redirect the login page to home after logging in to google auth
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuth }) {
  // react-router-dom navigation to homepage after login
  let navigate = useNavigate();

  // function to login from google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      // adding a user log inside the cache using Local Storage
      localStorage.setItem("isAuth", true);
      // determining if we are logged in or not
      setIsAuth(true);
      // navigation link to homepage after login
      navigate("/");
    });
  };
  return (
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
