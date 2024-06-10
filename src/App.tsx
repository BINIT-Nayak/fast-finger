import { useState } from "react";
import "./App.css";
import { GamePage } from "./components/gamePage/GamePage";
import { HomePage } from "./components/homePage";

function App() {
  type difficulty = "Easy" | "Medium" | "Hard";
  const [currentPage, setCurrentPage] = useState("HomePage");
  const [name, setName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<difficulty>("Easy");

  const navigateToGamePage = (difficulty: string, name: string) => {
    setCurrentPage("GamePage");
    setName(name);
    setDifficulty(difficulty as "Easy" | "Medium" | "Hard");
  };

  const navigateToHomePage =()=>{
    setCurrentPage("HomePage");
  }

  const renderPage = () => {
    switch (currentPage) {
      case "HomePage":
        return <HomePage navigateToGamePage={navigateToGamePage} />;
      case "GamePage":
        return <GamePage name={name} difficulty={difficulty} navigateToHomePage={navigateToHomePage} />;
      default:
        return null;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
