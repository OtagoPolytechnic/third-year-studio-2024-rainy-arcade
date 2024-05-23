import React, { useEffect, useState } from "react";
import Ageform from "./components/ageform";
import Carousel from "./components/Carousel";
import Game from "./components/Game";
// import Item from "./components/Game-Item";
const App = () => {
  const [games, setGames] = useState([]);
  const [path, setPath] = useState("");
  const [active, setActive] = useState({});

  useEffect(() => {
    console.log("hello", active);
  }, [active]);
  return (
    <div className="App">
      <div className="shader"></div>
      <div className="OPA"></div>
      <div>
        <div id="gameInfo">
          <Game />
          {!games.length > 0 ? (
            <Ageform setGames={setGames} setPath={setPath} />
          ) : null}
          {games.length > 0 ? (
            <Carousel items={games} setActive={setActive} />
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
