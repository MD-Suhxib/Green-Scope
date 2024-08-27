import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Style.css';

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const PlantIdentifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [plantInfo, setPlantInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setError(null);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setLoading(true);

      try {
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const fileData = await readFileAsDataURL(file);

        const imageParts = [
          {
            inlineData: {
              data: fileData.split(',')[1],
              mimeType: file.type
            }
          }
        ];

        const result = await model.generateContent([
          "Identify Only this plant and provide the following information: Plant Name, Scientific Name, Origin, Brief Description, Care Instructions, and One Interesting Fact. Except plants any other thing appears then dont give the output as Not Available ",
          ...imageParts
        ]);

        if (result.response) {
          const text = await result.response.text(); // Await added here
          console.log("AI response:", text);
          const parsedInfo = parseAIResponse(text);
          setPlantInfo(parsedInfo);
        } else {
          throw new Error("No response from AI model");
        }
      
      } catch (error) {
        console.error("Error identifying plant:", error);
        setError(`Failed to identify the plant. Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  const parseAIResponse = (text) => {
    if (!text) return 'No information available.';

    // Initialize fields
    let plantName = 'Not Available';
    let scientificName = 'Not Available';
    let origin = 'Not Available';
    let description = 'Not Available';

    // Remove '##', split response into lines, and trim
    const lines = text.split('\n').map(line => line.replace(/##/g, '').trim());

    // Extract relevant information and format
    lines.forEach(line => {
      if (line.toLowerCase().includes('plant name')) {
        plantName = line.split(':')[1]?.trim() || plantName;
        plantName = `<strong>Plant Name:</strong> ${plantName}`;
      } else if (line.toLowerCase().includes('scientific name')) {
        scientificName = line.split(':')[1]?.trim() || scientificName;
        scientificName = `<strong>Scientific Name:</strong> ${scientificName}`;
      } else if (line.toLowerCase().includes('origin')) {
        origin = line.split(':')[1]?.trim() || origin;
        origin = `<strong>Origin:</strong> ${origin}`;
      } else if (line.toLowerCase().includes('brief description')) {
        description = line.split(':')[1]?.trim() || description;
        description = `<strong>Description:</strong> ${description}`;
      }
    });

    // Combine the extracted information into a formatted string
    return `
  ${plantName}<br><br>
  ${scientificName}<br><br>
  ${origin}<br><br>
  ${description}
`
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Replace **text** with <strong>text</strong>
  .replace(/\*(.*?)\*/g, '<strong>$1</strong>')      // Replace *text* with <strong>text</strong>
  .replace(/#\s*(.*?)(?=<br>|$)/g, '<h2>$1</h2>');  
  }// Replace #text with <h2>text</h2>


  return (
    <div className="plant-identifier">
      <header>
        <h1>🌿 Plant Identifier</h1>
        <p>Upload an image of a plant to learn more about it!</p>
      </header>

      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          id="file-upload"
          className="file-input"
          disabled={loading}
        />
        <label htmlFor="file-upload" className="file-label">
          {loading ? 'Identifying...' : 'Choose an image'}
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}

      {plantInfo && (
        <div className="plant-info" dangerouslySetInnerHTML={{ __html: plantInfo }}></div>
      )}
    </div>
  );
};

export default PlantIdentifier;
