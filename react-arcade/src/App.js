import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <h1>The Otago Polytechnic Arcade</h1>
    <div class="gameSelect">

      <div class="singleGame">
        <a href=".\assets\games\BadPac.exe" target="_blank">
          <button type="button">BadPac</button>
        </a>
      </div>

      <div class="singleGame">
        <a href="./assets/games/BadPac.png" target="_blank">
          <button type="button">Breakout</button>
        </a>
      </div>
{/* End of singleGame */}

      <div class="bottomNav">
      <div class="backButton">
        <a href=".\index.html">
          <button type="button">Home</button>
        </a>
      </div>
{/* End of backButton */}
    </div>
    </div>
{/* End of gameSelect */}
    </div>
  );
}

export default App;
