const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Route to handle data send
app.post('/data-send', (req, res) => {
  const { name, color } = req.body;
  console.log(`Received data - Name: ${name}, Color: ${color}`);
  res.sendStatus(200);
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
