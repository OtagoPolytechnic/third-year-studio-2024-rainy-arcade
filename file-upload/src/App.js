import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // State to store selected file details
  const [fileInfo, setFileInfo] = useState({ name: '', size: 0 });

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      // Update the fileInfo state
      setFileInfo({
        name: file.name,
        size: file.size,
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
