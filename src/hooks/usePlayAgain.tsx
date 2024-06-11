import { useState } from "react";

const usePlayAgain = (level: any, timerRef: any, enteredWordRef: any) => {
  const [iter, setIter] = useState<number>(1);
  const [counter, setCounter] = useState<number>(0);
  const [scoredata, setScoreData] = useState<any>([]);
  const [wordCompleted, setWordCompleted] = useState<number>(0);
  const [stop, setStop] = useState<boolean>(false);

  function playagain() {
    setIter(iter + 1);
    enteredWordRef.current!.value = "";
    setCounter(0);
    setWordCompleted(0);
    setStop(false);

    setScoreData([...scoredata.slice(-5), { iter, counter, wordCompleted }]);
    scoredata.map((element: any) => {
      let max = 0;
      if (element.counter > max) {
        max = element.counter;
        highScoreRef.current!.innerHTML = `High score: ${max} `;
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
    // <Link to='/gamepage'></Link>
    // window.location.href = "/gamepage"
  }
  return {};
};

export default usePlayAgain;
