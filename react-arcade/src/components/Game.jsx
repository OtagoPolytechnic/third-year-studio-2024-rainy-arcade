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


  return (
    <div className="App">
      {/* <Ageform setGames={setGames} setPath={setPath}/> */}
      <div className="gameInfo">
        {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
          {games.map(game => (
            <li key={game.game}> */}
        {/* <Button game={game.game} path={`${path}/${game.exepath}`}/> */}
        {/* </li>
          ))}
        </ul> */}
      </div>{" "}
      {/* End of GameInfo*/}
    </div>
  );
}

export default Game;
