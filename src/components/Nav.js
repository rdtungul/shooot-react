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
      window.location.pathname = "/shooot-react";
    });
  };

  return (
    <div>
      <Router>
        <nav>
          <Link to="/shooot-react"> Home</Link>
          {!isAuth ? (
            <Link to="/shooot-react/login"> Login</Link>
          ) : (
            <div>
              <Link to="/shooot-react/createpost"> Create Post</Link>
              <button className="logout-btn" onClick={signOutUser}>
                {" "}
                Logout
              </button>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/shooot-react" element={<Home isAuth={isAuth} />} />
          <Route
            path="/shooot-react/createpost"
            element={<CreatePost isAuth={isAuth} />}
          />
          <Route
            path="/shooot-react/login"
            element={<Login setIsAuth={setIsAuth} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
