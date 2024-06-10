import GamePage from "./gamePage/Gamepage";
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
