const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3001; // Ensure this is different from your React app's port

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/mcivtj1/Desktop/third-year-studio-2024-rainy-arcade/uploads') 
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
