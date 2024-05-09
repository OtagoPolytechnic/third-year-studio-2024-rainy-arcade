import "../App.css";
import { useState } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Item = ({ id, level }) => {
  const className = `item level${level}`;
  return <div className={className}>{id}</div>;
};

const Carousel = ({ items, active }) => {
  const [state, setState] = useState({
    active: active,
    direction: "",
  });

  const moveLeft = () => {
    const newActive = state.active - 1;
    setState({
      active: newActive < 0 ? items.length - 1 : newActive,
      direction: "left",
    });
  };

  const moveRight = () => {
    setState({
      active: (state.active + 1) % items.length,
      direction: "right",
    });
  };

  const generateItems = () => {
    const generatedItems = [];
    let level;
    for (let i = state.active - 2; i < state.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      level = state.active - i;
      generatedItems.push(
        <CSSTransition key={index} classNames={state.direction} timeout={1000}>
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
      <TransitionGroup>
        {generateItems()}
      </TransitionGroup>
      <div className="arrow arrow-right" onClick={moveRight}>
        <i className="fi-arrow-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
