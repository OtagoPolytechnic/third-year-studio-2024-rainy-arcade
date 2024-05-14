import React, { useEffect, useState } from "react";
// import "./App.css";
import Button from "./components/button";
import Ageform from "./components/ageform";
import Carousel from "./components/Carousel";
import Game from "./components/Game";

const App = () => {
  const [games, setGames] = useState([])
  const [path, setPath] =  useState("")

  console.log(games)
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
            <Carousel items={games} active={0} /> 
            :
            <div>Loading...</div>
          }
      </div>    
    </div>
  );
}

export default App;

{/*
<div class="gameSelect">
  <ul style={{ listStyleType: 'none', padding: 0 }}>
    {games.map(game => (
      <li key={game.game}>
        <Button game={game.game} path={`${path}/${game.exepath}`}/>
      </li>
    ))}
  </ul>

  <div class="bottomNav">
    <div class="backButton">
        <button type="button">Home</button>
    </div>
  </div>
</div> */}