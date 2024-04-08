import React, { useState } from 'react';
import './App.css';

// FileUploader remains unchanged
const FileUploader = ({ onFileSelect }) => (
  <div className="file-uploader">
    <input type="file" id="file-upload" onChange={onFileSelect} style={{display: 'none'}} />
    <label htmlFor="file-upload" className="submit-button">Choose File</label>
  </div>
);

// Form component remains unchanged
const Form = ({ name, setName, color, setColor, onSubmit }) => (
  <form className="data-form" onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      await sendFile(file);
    } else {
      console.error('No file selected');
    }

    await sendData(name, color);
  };

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('File upload failed');
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const sendData = async (name, color) => {
    const data = { name, color };
    try {
      const response = await fetch('http://localhost:3002/data-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Data send failed');
      console.log('Data sent successfully!');
    } catch (error) {
      console.error('Error sending data:', error);
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
        <Form name={name} setName={setName} color={color} setColor={setColor} onSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;
