import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/button";
import axios from "axios";
import Ageform from "./components/ageform";

function App() {
  const [games, setGames] = useState([])
  const [path, setPath] =  useState("")

  return (
    <div className="App">
      <h1>The Otago Polytechnic Arcade</h1>
      <Ageform setGames={setGames} setPath={setPath}/>
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
      </div>
    </div>
  );
}

export default App;
