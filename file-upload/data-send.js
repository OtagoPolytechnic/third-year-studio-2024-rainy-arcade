const { SerialPort } = require('serialport');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Initialize serial port 
const port = new SerialPort({
  path: 'COM3',
  baudRate: 115200,
});

// Open errors will be emitted as an error event
port.on('error', function (err) {
  console.log('Error: ', err.message);
});

// POST route to receive data and send it through the serial port
app.post("/data-send", async (req, res) => {
  const { name, color } = req.body; // Extracting name and color from the request body
  const color_message = `C${color.slice(1)}`; // Correctly remove '#' from color for Arduino
  const name_message = `T${name}`;

  port.write(color_message, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Color Message written:', color_message);
  });
  await sleep(1000);
  port.write(name_message, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Name Message written:', name_message);
    res.send("Data sent over serial port.");
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
