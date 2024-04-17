import React from "react";
import "./App.css";
import axios from "axios";

const launchGame = () => {
  axios.post("http://localhost:3000/executeShortcut", {
    path: "C:/Users/Rkoks/OneDrive - Otago Polytechnic/Year 4 2024/Studio 6/third-year-studio-2024-rainy-arcade/react-arcade/assets/games/BadPac.exe"
  })
}

function App() {
  return (
    <div className="App">
      <h1>The Otago Polytechnic Arcade</h1>
      <div class="gameSelect">

        <div class="singleGame">
            <button type="button" onClick={launchGame}>BadPac</button>
        </div>

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
