import { useState } from "react";
import "./homePage.css";

type difficulty = "Easy" | "Medium" | "Hard";

export const HomePage = (props: {
  navigateToGamePage: (arg0: string, arg1: string) => void;
}) => {
  const [name, setName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<difficulty>("Easy");

  const NameValidate = () => {
    if (name.trim().length == 0) {
      alert("Name not Entered");
      return;
    } else {
      props.navigateToGamePage(difficulty, name);
    }
  };

  return (
    <div className="homePage">
      <div className="homePage__thumbnail" />
      <div className="homePage__title">Fast Finger</div>
      <div className="homePage__subtitle">
        -------------------the ultimate typing game----------------
      </div>

      <input
        data-testid="name-input"
        placeholder="Enter your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="homePage__difficultySelector"
        onChange={(e) =>
          setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")
        }
      >
        <option value="Easy">Easy Level</option>
        <option value="Medium">Medium Level</option>
        <option value="Hard">Hard Level</option>
      </select>
      <button className='homePage__button' onClick={NameValidate}>Start Game</button>
    </div>
  );
};
