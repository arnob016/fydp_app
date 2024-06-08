'use client';
import { useState } from 'react';

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('/api/classify-image/', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setPrediction(result.predicted_class);
  };

  return (
    <div className="container">
      <h1>Upload an Image for Classification</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {prediction !== null && <p>Predicted Class: {prediction}</p>}
    </div>
  );
}
