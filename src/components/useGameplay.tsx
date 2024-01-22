import { useState, useEffect } from "react";
import data from "../assets/dictionary.json";

const useGameplay = (
  level: any,
  difficultyFactor: number,
  timerRef: any,
  givenWordRef: any,
  enteredWordRef: any,
  highScoreRef: any
) => {
  const [counter, setCounter] = useState<number>(0);
  const [wordCounter, setWordCounter] = useState<number>(5);
  const [stop, setStop] = useState<boolean>(false);
  const [givenWord, setGivenWord] = useState(data[12347]);
  const [wordCompleted, setWordCompleted] = useState<number>(0);
  const [iter, setIter] = useState<number>(1);
  const [scoredata, setScoreData] = useState<any>([]);
  const [maxscore,setmaxscore]=useState<number>(0);

  if (level == "Easy") difficultyFactor = 1;
  else if (level == "Medium") difficultyFactor = 1.5;
  else difficultyFactor = 2;

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
      timerRef.current!.style.visibility = "hidden";
      enteredWordRef.current!.style.visibility = "hidden";
      givenWordRef.current!.style.color = "#ffbf00";
      givenWordRef.current!.innerHTML = counter;
    }
  }, [counter]);

  const generateWord = (level: String) => {
    givenWordRef.current!.style.color = "#ffbf00";
    function random(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1));
    }

    const dictonary = data.filter((word) => {
      if (level == "Easy") {
        return word.length <= 4;
      } else if (level == "Medium") {
        return word.length > 4 && word.length <= 8;
      } else {
        return word.length > 8;
      }
    });
    const word = dictonary[random(0, dictonary.length - 1)];

    setGivenWord(word);
    setWordCounter(Math.floor(givenWord.length / difficultyFactor));
    difficultyFactor = difficultyFactor + 0.01;
    if (difficultyFactor >= 1.5) level = "Medium";
    else if (difficultyFactor >= 2) level = "Difficult";
  };

  function handlematch(e: any) {
    let temp = e.target.value;
    if (temp === givenWord) {
      setWordCompleted((wordCompleted) => wordCompleted + 1);
      givenWordRef.current!.style.color = "green";
      enteredWordRef.current!.value = "";
      generateWord(level);
    } else {
      givenWordRef.current!.style.color = "red";
    }
  }
  function playagain() {
    setIter(iter + 1);
    enteredWordRef.current!.value = "";
    setCounter(0);
    setWordCompleted(0);
    setStop(false);

    setScoreData([...scoredata.slice(-5), { iter, counter, wordCompleted }]);
    scoredata.map((element: any) => {
      if (element.counter > maxscore) {
        setmaxscore(element.counter);
        highScoreRef.current!.innerHTML = `High score: ${element.counter} `;
      }
      return (
        <div>
          Game {element.iter}= Time: {element.counter} Word Completed:{" "}
          {element.wordCompleted}
        </div>
      );
    });
    timerRef.current!.style.visibility = "visible";
    enteredWordRef.current!.style.visibility = "visible";
    enteredWordRef.current!.focus();
    generateWord(level);
  }
  return {
    handlematch,
    playagain,
    counter,
    iter,
    scoredata,
    wordCounter,
    givenWord,
    maxscore
  };
};

export default useGameplay;
