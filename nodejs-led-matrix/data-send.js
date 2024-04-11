const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Board, Led } = require("johnny-five");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

const board = new Board({ port: "COM4" });

const LED_WIDTH = 45;
const LED_HEIGHT = 8;

board.on("ready", () => {
  app.post("/data-send", (req, res) => {
    const { name, color } = req.body;
    console.log(`Received data - Name: ${name}, Color: ${color}`);
    const neoMatrix = new Led.Matrix.RGB({
      width: LED_WIDTH,
      height: LED_HEIGHT,
      pins: {
        data: 6, // Pin connected to the data input of the NeoPixel RGB matrix
      },
    });

    const text = name;

    // Function to scroll text across LED matrix
    function scrollText() {
      let offset = 0;
      setInterval(() => {
        neoMatrix.clear(); // Clear the matrix before displaying new text
        neoMatrix.draw(text, -offset, 0, {
          color: color, // Change color to red (hexadecimal)
        }); // Draw text with offset
        neoMatrix.show(); // Display the updated matrix
        offset++;
        if (offset >= text.length + LED_WIDTH) {
          offset = 0;
        }
      }, 100); // Adjust scrolling speed (milliseconds per frame)
    }

    // Start scrolling text
    scrollText();
  });

  // Server listening
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
