import React from "react";
import "./App.css";
import Button from "./components/button";

function App() {
  let temp = [
    { game: "PacMan", path: "react-arcade/assets/games/BadPac.exe" },
    { game: "Test 2", path: "NoWhere" },
    { game: "Test 3", path: "NoWhere" },
    { game: "Test 4", path: "NoWhere" },
    { game: "Test 5", path: "NoWhere" },
    { game: "Test 6", path: "NoWhere" },
    { game: "Test 7", path: "NoWhere" },
  ];

  return (
    <div className="App">
      <h1>The Otago Polytechnic Arcade</h1>

      <div class="gameTile">
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {temp.map((game) => (
            <li key={game.game}>
              <Button game={game.game} path={game.path} />
            </li>
          ))}
        </ul>
      </div>
      {/* End of gameTile */}

      <div class="bottomNav">
        <div class="backButton">
          <button type="button">Home</button>
        </div>
      </div>
      {/* End of bottomNav */}
    </div>
  );

}

export default App;
