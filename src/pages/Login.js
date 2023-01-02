import { React, useEffect } from "react";
// importing the firebase-config for the user auth (google auth)
import { auth, provider } from "../firebase-config";
// importing firebase package to enable pop-up
import { signInWithPopup } from "firebase/auth";
// adding react-router-dom to redirect the login page to home after logging in to google auth
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// google analytics
import ReactGA from "react-ga";

export default function Login({ setIsAuth }) {
  // react ga initialization
  useEffect(() => {
    // ga non-interactive
    ReactGA.pageview(window.location.pathname);
  }, []);
  // react-router-dom navigation to homepage after login
  let navigate = useNavigate();

  // function to login from google
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    // // ga interactive
    ReactGA.pageview("/shooot-react");

    signInWithPopup(auth, provider).then((res) => {
      // adding a user log inside the cache using Local Storage
      localStorage.setItem("isAuth", true);
      // determining if we are logged in or not
      setIsAuth(true);
      // navigation link to homepage after login
      navigate("/shooot-react");
    });
  };
  return (
    <div className="login-page">
      <Heading as="h4">Sign In With Google to Continue</Heading>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
