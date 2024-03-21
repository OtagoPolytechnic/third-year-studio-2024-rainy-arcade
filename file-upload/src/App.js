import React, { useState } from 'react';
import './App.css';

function App() {
  // File upload state (unchanged)
  const [fileInfo,] = useState({ name: '', size: 0 });

  // Name and color state
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      // Send the file to the backend
      fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        console.log(data); // "File uploaded successfully"
        // Update the fileInfo state here if needed
      })
      .catch(error => {
        console.error(error);
      });
    }
  };
  
// Form submission
const handleSubmit = (event) => {
  event.preventDefault();
  sendData(name, color);
};

// Send data to SerialServer
const sendData = async (name, color) => {
  // You might need to convert the RGB color into a format the Arduino understands
  const data = { name, color };

  const response = await fetch('http://localhost:3002/data-send', { // Assuming SerialServer is on port 3002
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log('Data sent successfully!');
  } else {
    console.error('Error sending data');
  }
};

return (
  <div className="App">
    <header className="App-header">
      {/* File Upload Section */}
      <input type="file" onChange={handleFileChange} />
      {fileInfo.name && (
        <div>
          <p>File Name: {fileInfo.name}</p>
          <p>File Size: {fileInfo.size} bytes</p>
        </div>
      )}

      {/* Name and Color Section */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="color">Color (RGB):</label>
        <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <button type="submit">Send to Serial Server</button>
      </form>

    </header>
  </div>
);
}

export default App;