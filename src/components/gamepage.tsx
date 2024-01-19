import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import easydata from "../assets/easyWords.json";
import mediumdata from "../assets/mediumWords.json";
import harddata from "../assets/hardWords.json";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const page = () => {
  const location = useLocation();
  let level = location.state.level;
  let difficultyFactor:number = 1.5;

  const [iter, setIter] = useState<number>(1);
  const [counter, setCounter] = useState<number>(0);
  const [wordCounter, setWordCounter] = useState<number>(5);
  const [enteredWord, setEnteredWord] = useState<String>("");
  const [givenWord, setGivenWord] = useState(mediumdata[0]);
  const [stop, setStop] = useState<boolean>(false);
  const [scoredata, setScoreData] = useState<any>([]);
  const [wordCompleted, setWordCompleted]=useState<number>(0);

  const timerRef=useRef<HTMLDivElement | null>(null);
  const givenWordRef=useRef<HTMLParagraphElement| null | number |any>(null);
  const enteredWordRef=useRef<HTMLInputElement>(null);
  const highScoreRef=useRef<HTMLDivElement>(null);

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
      setWordCounter((wordCounter) => wordCounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);

  useEffect(() => {
    if (wordCounter <= 0) {
      setStop(true);
      // console.log(scoredata);
      timerRef.current!.style.visibility = "hidden";
      enteredWordRef.current!.style.visibility = "hidden";
      givenWordRef.current!.style.color = "#ffbf00";
      // givenWordRef.current.style.fontSize="40px";
      // givenWordRef.current.innerHTML = `Timer: ${counter} Word Completed: ${wordCompleted}`;
      givenWordRef.current!.innerHTML=counter;
      
    }
  }, [counter]);

  function randomword() {
    // console.log(level);
    givenWordRef.current!.style.color = "#ffbf00";
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
    // console.log(`wordCounter= ${wordCounter}`);
  }

  function handlematch(e:any) {
    let temp=e.target.value;
    setEnteredWord(temp);
    if (temp === givenWord) {
      setWordCompleted((wordCompleted)=>wordCompleted+1);
      givenWordRef.current!.style.color = "green";
      enteredWordRef.current!.value="";
      randomword();
      // console.log("Match!");
    } else {
      givenWordRef.current!.style.color = "red";
      // console.log("No match!");
    }
  }

  function playagain() {
    setIter(iter + 1);
    enteredWordRef.current!.value="";
    setCounter(0);
    setWordCompleted(0);
    setStop(false);
    
    setScoreData([...scoredata.slice(-5), { iter, counter, wordCompleted }]);
    scoredata.map((element:any) => {
      let max = 0;
      if (element.counter > max) {
        max = element.counter;
        highScoreRef.current!.innerHTML = `High score: ${max} `;
      }
      return (
        <div>
          Game {element.iter}= Time: {element.counter}{" "}
          Word Completed: {element.wordCompleted}
        </div>
      );
    });
    timerRef.current!.style.visibility = "visible";
    enteredWordRef.current!.style.visibility = "visible";
    enteredWordRef.current!.focus();
    randomword();
    // <Link to='/gamepage'></Link>
    // window.location.href = "/gamepage"
  }

  return (
    <div
      className="background"
    >
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
          <div className="mainWindow--highScore" ref={highScoreRef}>High Score: 0 </div>
          <hr />
          {scoredata.map((element :any) => {
            let max = 0;
            if (element.counter > max) {
              max = element.counter;
              highScoreRef.current!.innerHTML = `High score: ${max} `;
            }
            return (
              <div>
                Game {element.iter}= Time: {element.counter}{" "}
                
                Word Completed: {element.wordCompleted}
              </div>
            );
          })}
        </div>

        <div className="mainWindow--gameWindow">
          <div className="gameWindow--timer" ref={timerRef}>
            
            {wordCounter}

            {/* <CountdownCircleTimer
            isPlaying
            duration={wordCounter}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() => {
                // setStop(true);
                // console.log(scoredata);
                timerRef.current.style.visibility = "hidden";
                enteredWordRef.current.style.visibility = "hidden";
                givenWordRef.current.style.color = "#ffbf00";
                givenWordRef.current.innerHTML = counter;
                return {shouldRepeat:true}
            }}
          > 
            {({ remainingTime }) => remainingTime}
            
          </CountdownCircleTimer> */}
          </div>
          <p className="gameWindow--givenWord" ref={givenWordRef}>{givenWord}</p>
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
          <button id="gameWindow--enter" onClick={() => (window.location.href = "/")}>
            Quit Game
          </button>
        </div>
        {/* <button onClick={()=>checkMatch()}> </button> */}
      </div>
    </div>
  );
};

export default page;
