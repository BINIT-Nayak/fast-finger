import {
  Navigate,
  Route,
  MemoryRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import Gamepage from "./components/gamePage/Gamepage";
import Home from "./components/homePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gamepage" element={<Gamepage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
