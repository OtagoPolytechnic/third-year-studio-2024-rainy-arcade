import React, { useEffect, useState } from "react";
import Item from "./Game-Item";
import { launchGame } from "../utils/Arcade-Backend-Functions";
import "./App.scss";

const Carousel = ({ items, setActive, path }) => {
  const [index, setIndex] = useState(0);
  let Image1 = require("../assets/img/gb_cart.png"); //Game 1
  let Image2 = require("../assets/img/logo_gb_cart.png"); //Game 2
  let Image3 = require("../assets/img/gb_cart.png"); //Game 3
  let Image4 = require("../assets/img/logo_gb_cart.png"); // Game 4

  let imgarr = [Image1, Image2, Image3, Image4]
  const handlePrevious = () => {
    const newIndex = index - 1;
    setIndex(newIndex < 0 ? items.length - 1 : newIndex);

    // Print all items in the array to the console
    console.log("Items in the array:");
    items.forEach((item, idx) => {
    });
  };

  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= items.length ? 0 : newIndex);
  };

  useEffect(() => {
    setActive(items[index]);
    console.log(`${path}/${items[index].exepath}`);
  }, [index, items, setActive]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "Enter"){
        launchGame(`${items.path}/${items[index].exepath}`)
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
          <img src={imgarr[index]} className="gameImg" />
        </div>
        <button onClick={handleNext} className="nextButton">
          Next
        </button>
      </div>

      <div className="launchBar">
        <button
          onClick={() => launchGame(`${path}/${items[index].exepath}`, `${path}/${items[index].antiMicroPath}`)}
          className="launchButton"
        >
          launch
        </button>
      </div>
    </div>
  );
};

export default Carousel;
