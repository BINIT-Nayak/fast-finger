import { useEffect, useState } from "react";
import data from "../assets/dictionary.json";

export const useGameplay = (initialLevel: string) => {
  const getRandomWord = (currentLevel: string) => {
    const random = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const filteredData = data.filter((word) => {
      if (currentLevel === "Easy") {
        return word.length <= 4;
      } else if (currentLevel === "Medium") {
        return word.length > 4 && word.length <= 8;
      } else {
        return word.length > 8;
      }
    });

    const randomIndex = random(0, filteredData.length - 1);
    return filteredData[randomIndex];
  };

  const [gameState, setGameState] = useState({
    timerScore: 0,
    wordScore: 0,
    countDownTimer: 5,
    givenWord: getRandomWord(initialLevel),
    enteredWord: "",
    stop: false,
    gameNumber: 1,
    scoreBoardData: [] as {
      gameNumber: number;
      timerScore: number;
      wordScore: number;
    }[],
    maxScore: 0,
    level: initialLevel,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.stop) {
        clearInterval(interval);
        return;
      }

      setGameState((prevState) => ({
        ...prevState,
        timerScore: prevState.timerScore + 1,
        countDownTimer: prevState.countDownTimer - 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.stop]);

  useEffect(() => {
    if (gameState.countDownTimer <= 0) {
      setGameState((prevState) => ({
        ...prevState,
        stop: true,
        givenWord: String(prevState.timerScore),
      }));
    }
  }, [gameState.countDownTimer]);

  const handleMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === gameState.givenWord) {
      setGameState((prevState) => ({
        ...prevState,
        wordScore: prevState.wordScore + 1,
        enteredWord: "",
        givenWord: getRandomWord(updateLevel(prevState.level)),
        countDownTimer: Math.floor(
          prevState.givenWord.length / getDifficultyFactor(prevState.level)
        ),
      }));
    } else {
      setGameState((prevState) => ({ ...prevState, enteredWord: inputValue }));
    }
  };

  const getDifficultyFactor = (currentLevel: string) => {
    switch (currentLevel) {
      case "Easy":
        return 1;
      case "Medium":
        return 1.5;
      case "Hard":
        return 2;
      default:
        return 1;
    }
  };

  const updateLevel = (currentLevel: string) => {
    const difficultyFactor = getDifficultyFactor(currentLevel) + 0.01;
    if (difficultyFactor >= 2) {
      return "Hard";
    } else if (difficultyFactor >= 1.5) {
      return "Medium";
    } else {
      return "Easy";
    }
  };

  const playAgain = () => {
    const newScoreBoardData = [
      ...gameState.scoreBoardData.slice(-9),
      {
        gameNumber: gameState.gameNumber,
        timerScore: gameState.timerScore,
        wordScore: gameState.wordScore,
      },
    ];

    const highestScore = newScoreBoardData.reduce(
      (max, scoreData) => Math.max(max, scoreData.timerScore),
      0
    );

    setGameState((prevState) => ({
      ...prevState,
      timerScore: 0,
      wordScore: 0,
      stop: false,
      givenWord: getRandomWord(prevState.level),
      countDownTimer: Math.floor(
        prevState.givenWord.length / getDifficultyFactor(prevState.level)
      ),
      gameNumber: prevState.gameNumber + 1,
      scoreBoardData: newScoreBoardData,
      maxScore: highestScore,
    }));
  };

  return {
    handleMatch,
    playAgain,
    enteredWord: gameState.enteredWord,
    timerScore: gameState.timerScore,
    gameNumber: gameState.gameNumber,
    scoreBoardData: gameState.scoreBoardData,
    countDownTimer: gameState.countDownTimer,
    givenWord: gameState.givenWord,
    maxScore: gameState.maxScore,
  };
};
