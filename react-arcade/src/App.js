import React from "react";
import "./App.css";
import Button from "./components/button";

function App() {

  let temp = [{game: "PacMan", path: "react-arcade/assets/games/BadPac.exe"},
              {game: "NotPacMan", path:"NoWhere"}]

  return (
    <div className="App">
      <h1>The Otago Polytechnic Arcade</h1>
      <div class="gameSelect">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {temp.map(game => (
            <li key={game.game}>
              <Button game={game.game} path={game.path}/>
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
