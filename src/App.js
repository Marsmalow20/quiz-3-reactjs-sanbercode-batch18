import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav";
import Routes from "./components/Routes";
import { Provider } from "./utils/Context";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider>
          <Nav />
          <Routes />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
