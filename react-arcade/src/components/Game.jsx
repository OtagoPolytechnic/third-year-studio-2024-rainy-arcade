// import React from "react";
// import "./App.scss";

// const Game = () => {
//   return (
//     <div id="app">
//       <div id="gameInfo">
//         <div className="gameTitle">Game Title</div>
//       </div>
//     </div>
//   );
// };

// export default Game;

import React, { useEffect, useState } from "react";
import "./App.scss";
import Button from "../components/button.jsx";
// import axios from "axios";
// import Ageform from "./components/ageform";

function Game() {
  //   const [games, setGames] = useState([])
  //   const [path, setPath] =  useState("")

  return (
    <div className="App">
      <div className="OPA"></div>
      {/* End of OPA */}
      {/* <Ageform setGames={setGames} setPath={setPath}/> */}
      <div className="gameInfo">
        {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
          {games.map(game => (
            <li key={game.game}> */}
        {/* <Button game={game.game} path={`${path}/${game.exepath}`}/> */}
        <image src="../assets/img/logo_gb_cart.png"/>
        {/* </li>
          ))}
        </ul> */}
      </div>{" "}
      {/* End of GameInfo*/}
    </div>
  );
}

export default Game;
