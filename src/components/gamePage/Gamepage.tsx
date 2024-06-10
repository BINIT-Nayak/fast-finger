import './gamePage.css';
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import useGameplay from "../../hooks/useGameplay";

export const GamePage = () => {
  const location = useLocation();
  let level = location.state.level;
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
    <div className="background">
      <div className="profile">
        <div className="profile--leftProfile">
          <div className="gamePage__subtitle">User: {location.state.user}</div>
          <div className="gamePage__subtitle"> {level} Level</div>
        </div>

        <div className="profile--scoreProfile">
          <div className="gamePage__subtitle">Fast Fingers </div>
          <div className="gamePage__subtitle"> Score: {counter} </div>
        </div>
      </div>

      <div className="gamePage__subtitle" id="gameNumber">
        Game {iter}
      </div>
      <div className="mainWindow">
        <div className="mainWindow--scoreBoard">
          Score Board
          <hr />
          <div className="mainWindow--highScore" ref={highScoreRef}>
            High Score: 0{" "}
          </div>
          <hr />
          {scoredata.map((element: any) => {
            highScoreRef.current!.innerHTML = `High score: ${maxscore} `;

            return (
              <div>
                Game {element.iter}= Time: {element.counter} Word Completed:{" "}
                {element.wordCompleted}
              </div>
            );
          })}
        </div>

        <div className="mainWindow--gameWindow">
          <div className="gameWindow--timer" ref={timerRef}>
            {wordCounter}
          </div>
          <p className="gameWindow--givenWord" ref={givenWordRef}>
            {givenWord}
          </p>
          <input
            type="text"
            className="gameWindow--enteredWord"
            placeholder="Enter the word here"
            onChange={handlematch}
            autoFocus
            ref={enteredWordRef}
          />

          <button id="gameWindow--enter" onClick={() => playagain()}>
            Play Again
          </button>
          <button
            id="gameWindow--enter"
            onClick={() => (window.location.href = "/")}
          >
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
};

