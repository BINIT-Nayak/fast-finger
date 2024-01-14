import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backgroundImage from "../images/background.jpg";
import easydata from "../assets/easyWords.json";
import mediumdata from "../assets/mediumWords.json";
import harddata from "../assets/hardWords.json";

const page = () => {
  const location = useLocation();
  let level = location.state.level;
  let difficultyfactor = 1.5;
  let[iter, setiter]=useState(1);
  const [gameover, setgameover] = useState(false);
  const [counter, setCounter] = useState(0);
  let [wordcounter, setwordcounter] = useState(5);
  const [enteredWord, setEnteredWord] = useState("");
  const [givenWord, setgivenWord] = useState(mediumdata[0]);
  const [stop, setStop] = useState(false);

  
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
      if(stop) {
        clearInterval(interval); 
        return;  
      }

      setCounter(counter => counter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);


  useEffect(() => {
    const interval = setInterval(() => {
      if(stop) {
        clearInterval(interval); 
        return;  
      }

      setwordcounter(wordcounter => wordcounter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stop]);

  useEffect(() => {
    if(wordcounter <=0) {
      setStop(true);
      setgameover(true);
    }

    if(gameover==true){
      document.querySelector('.timer').remove();
      document.querySelector('#enteruserword').remove();
      document.querySelector('#givenword').innerHTML=counter;

    }
  }, [wordcounter], [counter]);

  function randomword() {
    // console.log(level);
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
    console.log(`wordcounter= ${wordcounter}`);
  }

  function handlematch(e) {
    setEnteredWord(e.target.value);

    if (enteredWord.trim().toLowerCase() === givenWord.toLowerCase()) {
      something();
      randomword();
      console.log("Match!");
    } else {
      console.log("No match!");
    }
  }
  function something() {
    setEnteredWord("");
  }

  function playagain(){
    window.location.href = "/gamepage"
    
    setiter(iter+1);
  }

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
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
          <div>Game 1: 10</div>
          <div>Game 1: 10</div>
          <div>Game 1: 10</div>
          <div>Game 1: 10</div>
          <div>Game 1: 10</div>
        </div>

        <div className="timer">{wordcounter}</div>
        <p id="givenword">{givenWord}</p>
        <input
          type="text"
          id="enteruserword"
          placeholder="Enter the word here"
          value={enteredWord}
          onChange={handlematch}
        />
      </div>
      {/* <button onClick={()=>checkMatch()}> </button> */}

      <button id="enter" onClick={()=>playagain()}>
        Play Again
      </button>
      <button id="enter" onClick={() => (window.location.href = "/")}>
        Quit Game
      </button>
    </div>
  );
};

export default page;
