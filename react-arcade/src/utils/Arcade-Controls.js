import Item from "../components/Game-Item";
import { CSSTransition } from "react-transition-group"

export const generateItems = (buttonState, items) => {
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
          <Item id={items[index]} level={level} />
        </CSSTransition>
      );
    }
    return generatedItems;
  };