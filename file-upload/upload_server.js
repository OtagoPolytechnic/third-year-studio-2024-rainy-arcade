const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001; // Ensure this is different from your React app's port

// Configure CORS
app.use(cors());

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload') 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'dataFile', maxCount: 1 }]), (req, res) => {
  res.send('Files uploaded successfully');
});


// Configure CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
