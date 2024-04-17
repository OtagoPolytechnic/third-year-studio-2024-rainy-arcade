import React from "react";
// import logo from "./logo.svg";
import "./App.css";

// WEBSOCKET WAS ADDED UNDER SUGGESTION

// Websocket
const socket = new WebSocket("ws://localhost:8080")

// connection opened
socket.addEventListener("open", event => {
  socket.send("Connection Established")
});

// Listen for messages
socket.addEventListener("message", event => {
  socket.send("Connection Established")
});

function launchGame(){
  socket.send({
    game:"User Game"
  })
}

// END OF ADDED UNDER SUGGESTION

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
