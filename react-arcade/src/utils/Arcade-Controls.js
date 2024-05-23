import Item from "../components/Game-Item";
import { CSSTransition } from "react-transition-group"
import { launchGame } from "./Arcade-Backend-Functions";

export const generateItems = (buttonState, items, path, pressed, setPressed) => {
    const generatedItems = [];
    for (let i = buttonState.active - 2; i < buttonState.active + 3; i++) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      const level = buttonState.active - i;
      generatedItems.push(
        <CSSTransition key={index} classNames={buttonState.direction} timeout={500}>
          <Item id={items[index]} level={level} selected={buttonState.active}/>
        </CSSTransition>
      );
    }
    if (pressed) {
      setPressed(false);
      let antimicropath = `${path}/${items[buttonState.active].antiMicroPath}`
      launchGame(`${path}/${items[buttonState.active].exepath}`, antimicropath)
    }
    return generatedItems;
  };