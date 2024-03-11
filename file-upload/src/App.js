import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store selected file details
  const [fileInfo,] = useState({ name: '', size: 0 });

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
  

  

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={handleFileChange} />
        {fileInfo.name && (
          <div>
            <p>File Name: {fileInfo.name}</p>
            <p>File Size: {fileInfo.size} bytes</p>
          </div>
        )}
        
      </header>
    </div>
  );
}

export default App;
