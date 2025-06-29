import React, { useState, useRef } from 'react';
import { Leaf, Camera, Upload, Search, AlertCircle } from 'lucide-react';
import Webcam from 'react-webcam';
import Layout from '../layout/layout'  // Import the layout
import './PlantDiseasePrediction.css';  // Import the CSS

const PlantDiseasePrediction = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setPrediction(null);
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setImage(dataURLtoFile(imageSrc, "captured.jpg"));
    setPrediction(null);
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const predictDisease = async () => {
    if (!image) {
      alert("Please upload or capture an image!");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/agri_app/predict_disease/", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.disease);
    } catch (error) {
      console.error("Error predicting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
    <div className="card1">
      <div className="card-header1">
        <Leaf className="icon" />
        <h2>Plant Disease Detection</h2>
      </div>
      
      <div className="card-content1">
        {/* Left Column - Upload and Camera */}
        <div className="left-section1">
          {/* File Upload */}
          <div className="upload-box1">
            <label>
              <Upload className="icon" />
              <span>Upload plant image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>

          {/* Webcam */}
          <div className="webcam-container1">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={captureImage} className="camera-btn">
              <Camera className="icon" />
            </button>
          </div>
        </div>

        {/* Right Column - Preview and Results */}
        <div className="right-section1">
          {/* Preview */}
          {preview && (
            <div className="preview1">
              <img src={preview} alt="Preview" />
            </div>
          )}

          {/* Prediction Button */}
          <button onClick={predictDisease} disabled={!image || isLoading} className="analyze-btn">
            {isLoading ? <div className="loader" /> : <Search className="icon" />}
            Analyze Plant
          </button>

          {/* Results */}
          {prediction && (
            <div className="results-box1">
              <AlertCircle className="icon" />
              <div>
                <h3>Detection Result</h3>
                <p>{prediction}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default PlantDiseasePrediction;