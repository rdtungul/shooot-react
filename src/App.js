import { React } from "react";
import "./App.css";
// adding some ui from the app using chakra
// import { Heading, Text } from "@chakra-ui/react";
// importing nav components
import Nav from "./components/Nav";

// importing date-fns package for time checker
// import { format } from 'date-fns'

function App() {
  return (
    <div className="App">
      <Nav />
    </div>
  );
}

export default App;
