import React, { useState, useEffect, useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./carousel.scss";

const Item = ({ id, level }) => {
  const className = `item level${level}`;
  return <div className={className}>{id}</div>;
};

const Carousel = ({ items, active }) => {
  const [state, setState] = useState({
    active: active,
    direction: "",
  });

  const moveLeft = useCallback(() => {
    setState((prevState) => ({
      active: prevState.active === 0 ? items.length - 1 : prevState.active - 1,
      direction: "left",
    }));
  }, [items.length]);

  const moveRight = useCallback(() => {
    setState((prevState) => ({
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
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [moveLeft, moveRight]); // Re-add listeners if moveLeft or moveRight changes

  const generateItems = () => {
    const generatedItems = [];
    for (let i = state.active - 2; i < state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      const level = state.active - i;
      generatedItems.push(
        <CSSTransition key={index} classNames={state.direction} timeout={500}>
          <Item id={items[index]} level={level} />
        </CSSTransition>
      );
    }
    return generatedItems;
  };

  return (
    <div id="carousel" className="noselect">
      <div className="arrow arrow-left" onClick={moveLeft}>
        <i className="fi-arrow-left"></i>
      </div>
      <TransitionGroup>{generateItems()}</TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
