import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../images/background.jpg";
import easydata from "../assets/easyWords.json";
import mediumdata from "../assets/mediumWords.json";
import harddata from "../assets/hardWords.json";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const page = () => {
  const location = useLocation();
  let level = location.state.level;
  let difficultyFactor = 1.5;

  const [iter, setIter] = useState(1);
  const [counter, setCounter] = useState(0);
  const [wordcounter, setWordCounter] = useState(5);
  const [enteredWord, setEnteredWord] = useState("");
  const [givenWord, setGivenWord] = useState(mediumdata[0]);
  const [stop, setStop] = useState(false);
  const [scoredata, setScoreData] = useState([]);

  const timerRef=useRef();
  const givenWordRef=useRef();
  const enteredWordRef=useRef();
  const highScoreRef=useRef();

  if (level == "Easy") difficultyFactor = 1;
  else if (level == "Medium") difficultyFactor = 1.5;
  else difficultyFactor = 2;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((counter) => counter + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stop) {
        clearInterval(interval);
        return;
      }

      setCounter((counter) => counter + 1);
      setWordCounter((wordcounter) => wordcounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);

  useEffect(() => {
    if (wordcounter <= 0) {
      setStop(true);
      // console.log(scoredata);
      timerRef.current.style.visibility = "hidden";
      enteredWordRef.current.style.visibility = "hidden";
      givenWordRef.current.style.color = "#ffbf00";
      givenWordRef.current.innerHTML = counter;
      
    }
  }, [counter]);

  function randomword() {
    // console.log(level);
    givenWordRef.current.style.color = "#ffbf00";
    if (level == "Easy") {
      const i = Math.floor(Math.random() * Object.keys(easydata).length);
      setGivenWord(easydata[i]);
      // console.log(easydata[i]);
    } else if (level == "Medium") {
      const i = Math.floor(Math.random() * Object.keys(mediumdata).length);
      setGivenWord(mediumdata[i]);
      // console.log(mediumdata[i]);
    } else {
      const i = Math.floor(Math.random() * Object.keys(harddata).length);
      setGivenWord(harddata[i]);
      // console.log(harddata[i]);
    }

    setWordCounter(Math.floor(givenWord.length / difficultyFactor));
    difficultyFactor = difficultyFactor + 0.01;
    if (difficultyFactor >= 1.5) level = "Medium";
    else if (difficultyFactor >= 2) level = "Difficult";
    // console.log(`wordcounter= ${wordcounter}`);
  }

  function handlematch(e) {
    setEnteredWord(e.target.value);

    if (enteredWord.trim().toLowerCase() === givenWord.toLowerCase()) {
      givenWordRef.current.style.color = "green";
      setEnteredWord("");
      randomword();
      // console.log("Match!");
    } else {
      givenWordRef.current.style.color = "red";
      // console.log("No match!");
    }
  }

  function playagain() {
    setIter(iter + 1);
    setEnteredWord("");
    setCounter(0);
    setStop(false);
    
    setScoreData([...scoredata.slice(-10), { iter, counter }]);
    scoredata.map((element, index) => {
      let max = 0;
      if (element.counter > max) {
        max = element.counter;
        highScoreRef.current.innerHTML = `High score: ${max} `;
      }
      return (
        <div>
          Game {element.iter}: {element.counter}{" "}
        </div>
      );
    });
    timerRef.current.style.visibility = "visible";
    enteredWordRef.current.style.visibility = "visible";
    enteredWordRef.current.focus();
    randomword();
    // <Link to='/gamepage'></Link>
    // window.location.href = "/gamepage"
  }

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="profile">
        <div className="profilesubtitle">User: {location.state.user}</div>
        <div className="profilesubtitle"> {level} Level</div>
      </div>

      <div className="scoreprofile">
        <div className="subtitle">Fast Fingers </div>
        <div className="subtitle"> Score: {counter} </div>
      </div>
      <div></div>
      <div className="subtitle" id="gamenumber">
        Game {iter}
      </div>
      <div className="mainwindow">
        <div className="scoreboard">
          Score Board
          <hr />
          <div id="highscore" ref={highScoreRef}>High Score: 0 </div>
          <hr />
          {scoredata.map((element, index) => {
            let max = 0;
            if (element.counter > max) {
              max = element.counter;
              highScoreRef.current.innerHTML = `High score: ${max} `;
            }
            return (
              <div>
                Game {element.iter}: {element.counter}{" "}
              </div>
            );
          })}
        </div>

        <div className="gamewindow">
          <div className="timer" ref={timerRef}>
            
            {wordcounter}

            {/* <CountdownCircleTimer
            isPlaying
            duration={wordcounter}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
              setStop(true);
                setgameover(true);
                isgameover();
            }}
          >
            {({ remainingTime }) => remainingTime}
            
          </CountdownCircleTimer> */}
          </div>
          <p id="givenword" ref={givenWordRef}>{givenWord}</p>
          <input
            type="text"
            id="enteruserword"
            placeholder="Enter the word here"
            value={enteredWord}
            onChange={handlematch}
            autoFocus
            ref={enteredWordRef}
          />

          <button id="enter" onClick={() => playagain()}>
            Play Again
          </button>
          <button id="enter" onClick={() => (window.location.href = "/")}>
            Quit Game
          </button>
        </div>
        {/* <button onClick={()=>checkMatch()}> </button> */}
      </div>
    </div>
  );
};

export default page;
