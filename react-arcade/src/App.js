import React, { useEffect, useState } from "react";
// import "./App.css";
import Ageform from "./components/ageform";
import Carousel from "./components/Carousel";
import Game from "./components/Game";
import Item from "./components/Game-Item";
// import Image from ""
const App = () => {
  const [games, setGames] = useState([]);
  const [path, setPath] = useState("");
  const [active, setActive] = useState({});
  // let sectionStyle = {
  //   width: "100%",
  //   height: "400px",
  //   image: 'url("/../assets/img/gb_cart.png")'
  // };
  useEffect(() => {
    console.log(active);
  }, [active]);
  return (
    <div className="App">
      <div className="shader"></div>
      <div>
        <div id="gameInfo">
          <Game />
          {!games.length > 0 ? (
            <Ageform setGames={setGames} setPath={setPath} />
          ) : null}
          {games.length > 0 ? (
            <Carousel items={games} setActive={setActive} />
          ) : (
            <div>Loading...</div>
          )}

        </div>
        {/* <div className="gameImg">erf</div> */}
        {/* <div style={sectionStyle}>erf</div> */}
      </div>
    </div>



  );
};

export default App;
