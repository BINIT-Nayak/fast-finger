import {
  Navigate,
  Route,
  MemoryRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

import { GamePage } from "./components/gamePage/GamePage";
import { HomePage } from "./components/homePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gamepage" element={<GamePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
