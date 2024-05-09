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
    cb(null, './uploads') 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// Configure CORS
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
