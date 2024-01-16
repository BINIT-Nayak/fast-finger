import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../images/background.jpg";
import easydata from "../assets/easyWords.json";
import mediumdata from "../assets/mediumWords.json";
import harddata from "../assets/hardWords.json";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const page = () => {
  const location = useLocation();
  let level = location.state.level;
  let difficultyfactor = 1.5;
  let [iter, setiter] = useState(1);
  const [gameover, setgameover] = useState(false);
  const [counter, setCounter] = useState(0);
  let [wordcounter, setwordcounter] = useState(5);
  const [enteredWord, setEnteredWord] = useState("");
  const [givenWord, setgivenWord] = useState(mediumdata[0]);
  const [stop, setStop] = useState(false);
  const [scoredata, setscoredata] = useState([]);

  if (level == "Easy") difficultyfactor = 1;
  else if (level == "Medium") difficultyfactor = 1.5;
  else difficultyfactor = 2;

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
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stop) {
        clearInterval(interval);
        return;
      }

      setwordcounter((wordcounter) => wordcounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);

  useEffect(
    () => {
      if (wordcounter <= 0) {
        setStop(true);
        setgameover(true);
      }

      if (gameover == true) {
        setscoredata([...scoredata.slice(-10), { iter, counter }]);
        // console.log(scoredata);
        document.querySelector(".timer").style.visibility = "hidden";
        document.querySelector("#enteruserword").style.visibility = "hidden";
        document.querySelector("#givenword").style.color = "#ffbf00";
        document.querySelector("#givenword").innerHTML = counter;
        
      }
    },
    [counter]
  );

  function randomword() {
    // console.log(level);
    document.querySelector("#givenword").style.color = "#ffbf00";
    if (level == "Easy") {
      const i = Math.floor(Math.random() * Object.keys(easydata).length);
      setgivenWord(easydata[i]);
      // console.log(easydata[i]);
    } else if (level == "Medium") {
      const i = Math.floor(Math.random() * Object.keys(mediumdata).length);
      setgivenWord(mediumdata[i]);
      // console.log(mediumdata[i]);
    } else {
      const i = Math.floor(Math.random() * Object.keys(harddata).length);
      setgivenWord(harddata[i]);
      // console.log(harddata[i]);
    }

    setwordcounter(Math.floor(givenWord.length / difficultyfactor));
    difficultyfactor = difficultyfactor + 0.01;
    if(difficultyfactor>=1.5)
    level="Medium";
  else if(difficultyfactor>=2)
  level="Difficult";
    // console.log(`wordcounter= ${wordcounter}`);
  }

  function handlematch(e) {
    setEnteredWord(e.target.value);

    if (enteredWord.trim().toLowerCase() === givenWord.toLowerCase()) {
      document.querySelector("#givenword").style.color = "green";
      setEnteredWord("");
      randomword();
      // console.log("Match!");
    } else {
      document.querySelector("#givenword").style.color = "red";
      if (wordcounter <= 0) {
        setscoredata([...scoredata, { iter, counter }]);
        document.querySelector(".timer").style.visibility = "hidden";
        document.querySelector("#enteruserword").style.visibility = "hidden";
        document.querySelector("#givenword").style.color = "#ffbf00";
        document.querySelector("#givenword").innerHTML = counter;
        
      }

      // console.log("No match!");
    }
  }

  function playagain() {
    setiter(iter + 1);
    setEnteredWord("");
    setCounter(0);
    setStop(false);
    setgameover(false);
    setscoredata([...scoredata.slice(-10), { iter, counter }]);
    scoredata.map((element, index) => {
      let max = 0;
      if (element.counter > max) {
        max = element.counter;
        document.getElementById("highscore").innerHTML = `High score: ${max} `;
      }
      return (
        <div>
          Game {element.iter}: {element.counter}{" "}
        </div>
      );
    });
    document.querySelector(".timer").style.visibility = "visible";
    document.querySelector("#enteruserword").style.visibility = "visible";
    document.querySelector("#enteruserword").focus();
    randomword();
    // randomword()
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
          <div id="highscore">High Score: 0 </div>
          <hr />
          {scoredata.map((element, index) => {
            let max = 0;
            if (element.counter > max) {
              max = element.counter;
              document.getElementById(
                "highscore"
              ).innerHTML = `High score: ${max} `;
            }
            return (
              <div>
                Game {element.iter}: {element.counter}{" "}
              </div>
            );
          })}
        </div>

        <div className="gamewindow">
          <div className="timer">
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
          <p id="givenword">{givenWord}</p>
          <input
            type="text"
            id="enteruserword"
            placeholder="Enter the word here"
            value={enteredWord}
            onChange={handlematch}
            autoFocus
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
