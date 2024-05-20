import React, { useState, useEffect, useCallback } from "react";
import { TransitionGroup } from "react-transition-group";
import "./App.scss";
import { generateItems } from "../utils/Arcade-Controls";
import { launchGame } from "../utils/Arcade-Backend-Functions";

const Carousel = ({ items, path, active }) => {
  // Active Button
  const [pressed, setPressed] = useState(false);
  const [buttonState, setButtonState] = useState({
    active: active || 0,
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
        setPressed(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveLeft, moveRight]);

  useEffect(() => {
    if (pressed) {
      console.log("pressed");
      launchGame(`${path}/${items[buttonState.active].exepath}`);
      setPressed(false);
    }
  }, [pressed, buttonState.active, items, path]);

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>
        <i className="fi-arrow-left"></i>
      </div>
      <TransitionGroup>{generateItems(buttonState, items, path, pressed, setPressed)}</TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
