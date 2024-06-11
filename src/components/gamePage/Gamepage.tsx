import { useGameplay } from "../../hooks/useGameplay";
import "./gamePage.css";

type Difficulty = "Easy" | "Medium" | "Hard";

interface GamePageProps {
  difficulty: Difficulty;
  name: string;
  navigateToHomePage: () => void;
}

export const GamePage = ({ difficulty, name, navigateToHomePage }: GamePageProps) => {
  const {
    handleMatch,
    playAgain,
    enteredWord,
    timerScore,
    gameNumber,
    scoreBoardData,
    countDownTimer,
    givenWord,
    maxScore,
  } = useGameplay(difficulty);

  return (
    <div className="gamePage">
      <div className="gamePage__title">Fast Fingers</div>
      <div className="gamePage__profile">
        <div>
          <div className="profile__element">User: {name}</div>
          <div className="profile__element"> {difficulty} Level</div>
          <div className="profile__element"> Score: {timerScore} </div>
        </div>
        <div className="profile__element profile__element--gameNumber">Game {gameNumber}</div>
      </div>

      <div className="gamePage__main">
        <div className="gamePage__main__scoreBoard">
          <div className="scoreBoard__title">Score Board</div>

          <div className="scoreBoard__highScore">High Score: {maxScore}</div>
          <div>
            {scoreBoardData.map(({ gameNumber, timerScore, wordScore }, index) => (
              <div key={index}>
                Game {gameNumber}: Time = {timerScore} Words Completed = {wordScore}
              </div>
            ))}
          </div>
        </div>

        <div className="gamePage__main__playArea">
          {countDownTimer !== 0 && <div className="playArea__timer">{countDownTimer}</div>}
          <p className="playArea__givenWord">{givenWord}</p>
          {countDownTimer !== 0 && (
            <input
              placeholder="Enter the word here"
              onChange={handleMatch}
              value={enteredWord}
              autoFocus
            />
          )}

          <button className="gamePageButton" onClick={playAgain}>
            Play Again
          </button>
          <button className="gamePageButton" onClick={navigateToHomePage}>
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
};