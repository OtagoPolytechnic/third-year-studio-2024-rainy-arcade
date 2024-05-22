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
          <Game/>
          { !games.length > 0 ?
            <Ageform setGames={setGames} setPath={setPath}/>
            :
            null
          }
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