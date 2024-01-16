import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/home";
import Gamepage from "./components/gamepage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/gamepage" element={<Gamepage/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
