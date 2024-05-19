import React, { useEffect, useState } from "react";
// import "./App.css";
import Ageform from "./components/ageform";
import Carousel from "./components/Carousel";
import Game from "./components/Game";

const App = () => {
  const [games, setGames] = useState([])
  const [path, setPath] =  useState("")

  return (
    <div className="App">
      <div>
        <div id="gameInfo">
          <div className="gameTitle">Game Title</div>
        </div>
          <Game/>
          <Ageform setGames={setGames} setPath={setPath}/>
          {
            games.length > 0 ?
            <Carousel items={games} path={path} active={0} /> 
            :
            <div>Loading...</div>
          }
      </div>    
    </div>
  );
}

export default App;