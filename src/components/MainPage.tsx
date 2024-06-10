import GamePage from "./gamePage/GamePage";
import Home from "./homePage/HomePage";

const MainPage = (props: any) => {
  const isPlaying = props.isPlaying;
  if (isPlaying) {
    return <GamePage />;
  } else {
    return <Home />;
  }
};

export default MainPage;
