import { React } from "react";
import "./App.css";
// adding some ui from the app using chakra
// import { Heading, Text } from "@chakra-ui/react";
// importing nav components
import Nav from "./components/Nav";
// google analytics
import ReactGA from "react-ga";
// importing date-fns package for time checker
// import { format } from 'date-fns'

// initializing ga tracking id
const TRACKING_ID = "UA-206393866-1";
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
