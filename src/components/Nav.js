import { React, useState } from "react";
// importing react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// importing the pages files
import Home from "../pages/Home";
import Login from "../pages/Login";
import CreatePost from "../pages/CreatePost";
// firebase package signout auth
import { signOut } from "firebase/auth";
// importing auth variable from firebase-config
import { auth } from "../firebase-config";

export default function Nav() {
  // determining user if they are logged in or not
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // logout function
  const signOutUser = () => {
    signOut(auth).then(() => {
      // clear the local storage
      localStorage.clear();
      // set the lolgin auth to false
      setIsAuth(false);
      // navigation link to landing page after logout
      window.location.pathname = "/login";
    });
  };

  return (
    <div>
      <Router>
        <nav>
          <Link to="/"> Home</Link>
          {!isAuth ? (
            <Link to="/login"> Login</Link>
          ) : (
            <div>
              <Link to="/createpost"> Create Post</Link>
              <button onClick={signOutUser}> Logout</button>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}
