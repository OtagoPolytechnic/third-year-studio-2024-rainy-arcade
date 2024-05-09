import React, { useState } from 'react';
import './App.css';

// FileUploader remains unchanged
const FileUploader = ({ onFileSelect }) => (
  <div className="file-uploader">
    <input type="file" id="file-upload" onChange={onFileSelect} style={{display: 'none'}} />
    <label htmlFor="file-upload" className="submit-button">Choose File</label>
  </div>
);

// Adjusted Form component to handle separate developer name and game name
const Form = ({ devName, setDevName, gameName, setGameName, color, setColor, onSubmit, isAgeRestricted, setIsAgeRestricted }) => (
  <form className="data-form" onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="dev-name">Dev Name:</label>
      <input type="text" id="dev-name" value={devName} onChange={(e) => setDevName(e.target.value)} />
      <label htmlFor="game-name">Game Name:</label>
      <input type="text" id="game-name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
    </div> 
    <div className="form-group">
      <label htmlFor="age-restriction">Age Restricted:</label>
      <input type="checkbox" id="age-restriction" checked={isAgeRestricted} onChange={(e) => setIsAgeRestricted(e.target.checked)} />
    </div>
    <div className="form-group">
      <label htmlFor="color">Color (RGB):</label>
      <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
    <button type="submit" className="submit-button">Send to Serial Server</button>
  </form>
);

function App() {
  const [file, setFile] = useState(null);
  const [devName, setDevName] = useState('');
  const [gameName, setGameName] = useState('');
  const [color, setColor] = useState('#000000');
  const [isAgeRestricted, setIsAgeRestricted] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create text content for new text file
    const textContent = `Dev Name: ${devName}\nGame Name: ${gameName}\nAge Restricted: ${isAgeRestricted ? 'Yes' : 'No'}`;
    const textFile = new Blob([textContent], { type: 'text/plain' });
    const dataFile = new File([textFile], "details.txt", { type: 'text/plain' });

    if (file) {
      await sendFile(file, dataFile);
    } else {
      console.error('No file selected');
    }
  };

  const sendFile = async (file, dataFile) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dataFile', dataFile);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('File upload failed');
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <FileUploader onFileSelect={handleFileChange} />
        {file && (
          <div>
            <p>File Name: {file.name}</p>
            <p>File Size: {file.size} bytes</p>
          </div>
        )}
        <Form 
          devName={devName} setDevName={setDevName} 
          gameName={gameName} setGameName={setGameName} 
          color={color} setColor={setColor} 
          onSubmit={handleSubmit}
          isAgeRestricted={isAgeRestricted} setIsAgeRestricted={setIsAgeRestricted}
        />
      </header>
    </div>
  );
}

export default App;
