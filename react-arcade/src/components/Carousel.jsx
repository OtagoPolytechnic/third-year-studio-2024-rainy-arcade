import React, { useState, useEffect, useCallback, useRef } from "react";
import { TransitionGroup } from "react-transition-group";
import "./App.scss";
import { generateItems } from "../utils/Arcade-Controls";

const Carousel = ({ items, active }) => {
  //Active Button
  const [buttonState, setButtonState] = useState({
    active: "",
    direction: "",
  });

   const moveLeft = useCallback(() => {
    setButtonState((prevState) => ({
        active: prevState.active === 0 ? items.length - 1 : prevState.active - 1,
        direction: "left",
    }));
}, [items.length]);

 const moveRight = useCallback(() => {
    setButtonState((prevState) => ({
        active: (prevState.active + 1) % items.length,
        direction: "right",
    }));
    console.log(active);
}, [items.length]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 37) {
        // Left arrow key
        moveLeft();
      } else if (event.keyCode === 39) {
        // Right arrow key
        moveRight();
      } else if (event.keyCode === 13) {
        // Enter key
        console.log("Enter key pressed ", active);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      console.log(active);
    };
  }, [moveLeft, moveRight]); // Re-add listeners if moveLeft or moveRight changes

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>
        <i className="fi-arrow-left"></i>
      </div>
        <TransitionGroup>{generateItems(buttonState, items)}</TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
