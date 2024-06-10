import { useRef } from "react";
import useGameplay from "../../hooks/useGameplay";
import "./gamePage.css";

type difficulty = "Easy" | "Medium" | "Hard";

export const GamePage = (props: {
  difficulty: difficulty;
  name: string;
  navigateToHomePage: () => void;
}) => {
  const level: difficulty = props.difficulty;
  const userName: string = props.name;
  let difficultyFactor: number = 1.5;

  const timerRef = useRef<HTMLDivElement | null>(null);
  const givenWordRef = useRef<HTMLParagraphElement | null | number | any>(null);
  const enteredWordRef = useRef<HTMLInputElement>(null);
  const highScoreRef = useRef<HTMLDivElement>(null);

  const {
    handlematch,
    playagain,
    counter,
    iter,
    scoredata,
    wordCounter,
    givenWord,
    maxscore,
  } = useGameplay(
    level,
    difficultyFactor,
    timerRef,
    givenWordRef,
    enteredWordRef,
    highScoreRef
  );

  return (
    <div className="gamePage">
      <div className="gamePage__title">Fast Fingers </div>
      <div className="gamePage__profile">
        <div>
          <div className="profile__element">User: {userName}</div>
          <div className="profile__element"> {level} Level</div>
          <div className="profile__element"> Score: {counter} </div>
        </div>
        <div className="profile__element profile__element--gameNumber">
          Game {iter}
        </div>
      </div>

      <div className="gamePage__main">
        <div className="gamePage__main__scoreBoard">
          <div className="scoreBoard__title">Score Board</div>

          <div className="scoreBoard__highScore" ref={highScoreRef}>
            High Score: 0{" "}
          </div>
          <div>
            {scoredata.map((element: any) => {
              highScoreRef.current!.innerHTML = `High score: ${maxscore} `;

              return (
                <div>
                  Game {element.iter}: Time = {element.counter} Words Completed
                  = {element.wordCompleted}
                </div>
              );
            })}
          </div>
        </div>

        <div className="gamePage__main__playArea">
          <div className="playArea__timer" ref={timerRef}>
            {wordCounter}
          </div>
          <p className="playArea__givenWord" ref={givenWordRef}>
            {givenWord}
          </p>
          <input
            placeholder="Enter the word here"
            onChange={handlematch}
            autoFocus
            ref={enteredWordRef}
          />

          <button className="gamePageButton" onClick={playagain}>
            Play Again
          </button>
          <button className="gamePageButton" onClick={props.navigateToHomePage}>
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
};
