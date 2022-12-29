import { useState } from "react";
import "./App.css";
// importing react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// adding some ui from the app using chakra
import { Heading, VStack, HStack, Text } from "@chakra-ui/react";
// importing the pages files
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
// firebase package signout auth
import { signOut } from "firebase/auth";
// importing auth variable from firebase-config
import { auth } from "./firebase-config";

function App() {
  // determining user if they are logged in or not
  const [isAuth, setIsAuth] = useState(false);

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
    <VStack>
      <Router>
        <nav>
          <Link to="/"> Home</Link>
          <Link to="/createpost"> Create Post</Link>
          {!isAuth ? (
            <Link to="/login"> Login</Link>
          ) : (
            <button onClick={signOutUser}> Logout</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>

      <Heading>Welcome to my Blogpost!</Heading>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quam
        odit repellendus dicta vitae nulla cumque, reiciendis laborum rerum
        ullam vero corrupti harum neque atque optio eum, a eos dolor?
      </Text>
    </VStack>
  );
}

export default App;
