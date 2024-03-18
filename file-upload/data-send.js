const express = require('express');
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const app = express();
app.use(bodyParser.json());

//port might need to be changed to match the Arduino 
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600 // baud rate needs to match on arduino 
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

// gets data from react app
app.post('/send-data', (req, res) => {
  const { name, color } = req.body;

  // convert hex color to R, G, B components
  const rgb = hexToRgb(color);

  // format the data for the Arduino
  const dataToSend = `${name},${rgb.r},${rgb.g},${rgb.b}\n`; 
  port.write(dataToSend);
  res.sendStatus(200);
});

// hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

app.listen(3002, () => {
  console.log('SerialServer listening on port 3002');
});
