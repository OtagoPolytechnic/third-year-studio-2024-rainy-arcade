import React, { useState } from 'react';
import './App.css';

const FileUploader = ({ onFileSelect }) => (
  <div className="file-uploader">
    <input type="file" id="file-upload" onChange={onFileSelect} style={{display: 'none'}} />
    <label htmlFor="file-upload" className="submit-button">Choose File</label>
  </div>
);

const ImageUploader = ({ onFileSelect }) => (
  <div className="file-uploader">
    <input type="file" id="image-upload" onChange={onFileSelect} style={{display: 'none'}} />
    <label htmlFor="image-upload" className="submit-button">Choose Image</label>
  </div>
);

const Form = ({ devName, setDevName, gameName, setGameName, color, setColor, controller, setController, onSubmit, isAgeRestricted, setIsAgeRestricted }) => (
  <form className="data-form" onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="dev-name">Dev Name:</label>
      <input type="text" id="dev-name" value={devName} onChange={(e) => setDevName(e.target.value)} />
      <label htmlFor="game-name">Game Name:</label>
      <input type="text" id="game-name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
    </div> 
    <div className="form-group">
      <label htmlFor="esrb-rating">ESRB Rating:</label>
      <select id="esrb-rating" value={isAgeRestricted} onChange={(e) => setIsAgeRestricted(e.target.value)}>
        <option value="E">E (Everyone)</option>
        <option value="E10+">E10+ (Everyone 10+)</option>
        <option value="T">T (Teen)</option>
        <option value="M">M (Mature 17+)</option>
        <option value="AO">AO (Adults Only 18+)</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="controller">Controller:</label>
      <select id="controller" value={controller} onChange={(e) => setController(e.target.value)}>
        <option value="Keyboard">Keyboard</option>
        <option value="Mouse">Mouse</option>
      </select>
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
  const [image, setImage] = useState(null);
  const [devName, setDevName] = useState('');
  const [gameName, setGameName] = useState('');
  const [color, setColor] = useState('#000000');
  const [controller, setController] = useState('Keyboard');
  const [isAgeRestricted, setIsAgeRestricted] = useState('E');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    if (image) {
      setImage(image);
    }
  };

  const formatSize = (size) => {
    const mbSize = size / (1024 * 1024);
    if (mbSize >= 1024) {
      return (mbSize / 1024).toFixed(2) + ' GB';
    } else {
      return mbSize.toFixed(2) + ' MB';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const textContent = `Dev Name: ${devName}\nGame Name: ${gameName}\nESRB Rating: ${isAgeRestricted}\nController: ${controller}\nColor: ${color}`;
    const textFile = new Blob([textContent], { type: 'text/plain' });
    const dataFile = new File([textFile], "details.txt", { type: 'text/plain' });

    if (file && image) {
      await sendFile(file, dataFile, image);
    } else {
      console.error('File or image not selected');
    }

    let name = `Dev | ${devName} - Game | ${gameName}`;

    await sendData(name, color);
  };

  const sendFile = async (file, dataFile, image) => {
    const formData = new FormData();
    formData.append('devName', devName);
    formData.append('gameName', gameName);
    formData.append('file', file);
    formData.append('dataFile', dataFile);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('File upload failed');
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
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
        <p>Instructions: Ensure the game name matches the name of the .exe file name please.</p>
        <FileUploader onFileSelect={handleFileChange} />
        <ImageUploader onFileSelect={handleImageChange} />
        {file && (
          <div>
            <p>File Name: {file.name}</p>
            <p>File Size: {formatSize(file.size)}</p>
          </div>
        )}
        {image && (
          <div>
            <p>Image Name: {image.name}</p>
            <p>Image Size: {formatSize(image.size)}</p>
          </div>
        )}
        <Form 
          devName={devName} setDevName={setDevName} 
          gameName={gameName} setGameName={setGameName} 
          color={color} setColor={setColor}
          controller={controller} setController={setController}
          onSubmit={handleSubmit}
          isAgeRestricted={isAgeRestricted} setIsAgeRestricted={setIsAgeRestricted}
        />
      </header>
    </div>
  );
}

export default App;
