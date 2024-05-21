const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001; // Ensure this is different from your React app's port

// Enable CORS for all requests
app.use(cors());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const gameName = req.body.gameName; // Ensure this is getting the game name
    const dir = `./uploads/${gameName}`; // Create a directory path using game name

    // Create directory if it does not exist
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, { recursive: true }, error => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: (req, file, cb) => {
    const gameName = req.body.gameName; // Get game name from the request
    const fileExtension = path.extname(file.originalname); // Get file extension
    cb(null, `${gameName}${fileExtension}`); // Set file name as game name
  }
});

const upload = multer({ storage }).fields([
  { name: 'file', maxCount: 1 },
  { name: 'dataFile', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

app.post('/upload', (req, res, next) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).send({ error: err.message });
    } else if (err) {
      return res.status(500).send({ error: err.message });
    }
    // If no errors, proceed to log the data and send a success response
    console.log('Developer Name:', req.body.devName);
    console.log('Game Name:', req.body.gameName);
    console.log('Controller:', req.body.controller);
    res.send('Files uploaded successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
