import Game from "./components/Game";
import React from "react";
import Carousel from "./components/Carousel";
import "../src/components/App.scss";



const App = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div>
      <Game/>
      <Carousel items={items} active={0} />
    </div>
  );
};

export default App;
