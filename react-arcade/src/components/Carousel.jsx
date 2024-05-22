// import React, { useState, useEffect, useCallback } from "react";
// import { TransitionGroup } from "react-transition-group";
// import "./App.scss";
// import { generateItems } from "../utils/Arcade-Controls";
// import { launchGame } from "../utils/Arcade-Backend-Functions";

// const Carousel = ({ items, path, active }) => {
//   // Active Button
//   const [pressed, setPressed] = useState(false);
//   const [buttonState, setButtonState] = useState({
//     active: active || 0,
//     direction: "",
//   });

//   const moveLeft = useCallback(() => {
//     setButtonState((prevState) => ({
//       active: prevState.active === 0 ? items.length - 1 : prevState.active - 1,
//       direction: "left",
//     }));
//   }, [items.length]);

//   const moveRight = useCallback(() => {
//     setButtonState((prevState) => ({
//       active: (prevState.active + 1) % items.length,
//       direction: "right",
//     }));
//   }, [items.length]);

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.keyCode === 37) {
//         // Left arrow key
//         moveLeft();
//       } else if (event.keyCode === 39) {
//         // Right arrow key
//         moveRight();
//       } else if (event.keyCode === 13) {
//         // Enter key
//         setPressed(true);
//       }
//     };

//     document.addEventListener("keydown", handleKeyPress);

//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [moveLeft, moveRight]);

//   useEffect(() => {
//     if (pressed) {
//       console.log("pressed");
//       launchGame(`${path}/${items[buttonState.active].exepath}`);
//       setPressed(false);
//     }
//   }, [pressed, buttonState.active, items, path]);

//   return (
//     <div id="carousel" className="noselect">
//       <div className="arrow arrow-left" onClick={moveLeft}>
//         <i className="fi-arrow-left"></i>
//       </div>
//       <TransitionGroup>{generateItems(buttonState, items, path, pressed, setPressed)}</TransitionGroup>
//       <div className="arrow arrow-right" onClick={moveRight}>
//         <i className="fi-arrow-right"></i>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

// import React, { useEffect, useState } from "react";
// import Item from "./Game-Item";
// import { launchGame } from "../utils/Arcade-Backend-Functions";
// import "./App.scss";

// const Carousel = ({ items, setActive }) => {
//   const [index, setIndex] = useState(0);
//   // let Image = require("../assets/img/grid_ani.gif");
//   // let Image = require("../assets/img/gb_cart.png");
//   let Image = require("../assets/games/old/BadPac/Space Fight.jfif");
  

//   const handlePrevious = () => {
//     const newIndex = index - 1;
//     setIndex(newIndex < 0 ? items.length - 1 : newIndex);
//   };

//   const handleNext = () => {
//     const newIndex = index + 1;
//     setIndex(newIndex >= items.length ? 0 : newIndex);
//   };
//   useEffect(() => {
//     setActive(items[index]);
//   }, [index]);


//   // What is displayed
//   return (
//     <div className="carousel">


//       <div className="gameSelector">
//         <button onClick={handlePrevious} className="prevButton">
//           Previous
//         </button>
//         <div className="gameTile">
//           <Item item={items[index]} />
//           <img src={Image} className="gameImg" />
//         </div>
//         <button onClick={handleNext} className="nextButton">
//           Next
//         </button>
//       </div>

//       <div className="launchBar">
//         <button
//           onClick={() => launchGame(`${items.path}/${items[index].exepath}`)}
//           className="launchButton"
//         >
//           launch
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import React, { useEffect, useState } from "react";
import Item from "./Game-Item";
import { launchGame } from "../utils/Arcade-Backend-Functions";
import "./App.scss";

const Carousel = ({ items, setActive }) => {
  const [index, setIndex] = useState(0);
  // let Image = require("../assets/img/grid_ani.gif");
  // let Image = require("../assets/img/gb_cart.png");
  let Image = require("../assets/games/old/BadPac/Space Fight.jfif");

  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? items.length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= items.length ? 0 : newIndex);
  };

  useEffect(() => {
    setActive(items[index]);
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);

  // What is displayed
  return (
    <div className="carousel">
      <div className="gameSelector">
        <button onClick={handlePrevious} className="prevButton">
          Previous
        </button>
        <div className="gameTile">
          <Item item={items[index]} />
          <img src={Image} className="gameImg" />
        </div>
        <button onClick={handleNext} className="nextButton">
          Next
        </button>
      </div>

      <div className="launchBar">
        <button
          onClick={() => launchGame(`${items.path}/${items[index].exepath}`)}
          className="launchButton"
        >
          launch
        </button>
      </div>
    </div>
  );
};

export default Carousel;
