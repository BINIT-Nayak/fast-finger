import "./homePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import thumbnail from "../../assets/images/thumbnail.png";

export const HomePage = () => {
  const [name, setName] = useState("");
  const [difficulty, setdifficulty] = useState("Easy");

  const navigate = useNavigate();
  function validate() {
    if (name.length == 0 || name.trim() == "") {
      alert("Name not Entered");
      return;
    } else {
      navigate("/gamepage", { state: { level: difficulty, user: name } });
    }
  }

  return (
    <div className="background">
      <img className="thumbnail" src={thumbnail} alt="Thumbnail of game" />
      <div className="home--title">Fast Finger</div>
      <div className="home--subtitle">
        -------------------the ultimate typing game----------------
      </div>

      <input
        id="name"
        data-testid="name-input"
        type="text"
        placeholder="Enter your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <div></div>
      <select
        name="difficulty"
        className="difficulty"
        onChange={(e) => setdifficulty(e.target.value)}
      >
        <option value="Easy">Easy Level</option>
        <option value="Medium">Medium Level</option>
        <option value="Difficult">Difficult Level</option>
      </select>
      <br />
      <button
        id="enter"
        style={{ cursor: "pointer" }}
        onClick={() => {
          validate();
        }}
      >
        {" "}
        Start Game
      </button>
    </div>
  );
};
