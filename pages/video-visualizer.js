import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const VideoVisualizer = () => {
  const router = useRouter();
  const { url, prediction } = router.query;
  const [videoUrl, setVideoUrl] = useState('');
  const [predictionResult, setPredictionResult] = useState('');

  useEffect(() => {
    if (url) {
      setVideoUrl(url);
    }
    if (prediction) {
      setPredictionResult(prediction);
    }
  }, [url, prediction]);

  return (
    <>
      <Navbar />
      <div className="video-visualizer-container">
        <div className="container">
          <h2>Visualizador de Video</h2>

          <div className="video-container">
            <video id="myVideo" controls width="640" height="360">
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="prediction-container">
              <h3>Predicción de la IA</h3>
              <div className="prediction-result">
                {predictionResult}
              </div>
              <div className="tooltip">
                <i className="fas fa-info-circle"></i>
                <span className="tooltiptext">Aquí se muestra la predicción de la IA sobre tu ejercicio.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoVisualizer;
