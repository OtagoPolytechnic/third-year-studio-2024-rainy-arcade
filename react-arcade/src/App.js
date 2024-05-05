import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/button";
import axios from "axios";

function App() {
  const [games, setGames] = useState([])
  const [path, setPath] =  useState("")

    const getGames = async () => {
      try {
          const response =  await axios.get("http://localhost:3001/getGames")
          console.log(response)
          setGames(() => response.data.games)
          setPath(() => response.data.path)
        } catch (error) {
          
      }
  }

  useEffect(() => {
    getGames()

  },[])

  return (
    <div className="App">
      <h1>The Otago Polytechnic Arcade</h1>
      <div class="gameSelect">
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {games.map(game => (
            <li key={game.game}>
              <Button game={game.game} path={`${path}/${game.game}/${game.exepath}`}/>
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
