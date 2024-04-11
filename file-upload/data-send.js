const SerialPort = require('serialport');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Initialize serial port (adjust '/dev/ttyUSB0' to your port name and baud rate as needed)
const port = new SerialPort('COM4', {
  baudRate: 115200
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
});

// POST route to receive data and send it through the serial port
app.post("/send-data", (req, res) => {
  const { name, color } = req.body;
  const message = `Name: ${name}, Color: ${color}\n`; // Format the message
  console.log(message);
  const color_message = `C${color}`;
  const name_message = `T${name}`;

  port.write(color_message, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Color Message written:', color_message);
    res.send("Data sent over serial port.");
  });
  port.write(name_message, (err) => {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Name Message written:', name_message);
    res.send("Data sent over serial port.");
  });
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
