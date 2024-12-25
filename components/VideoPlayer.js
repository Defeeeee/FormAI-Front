import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const VideoElement = styled.video`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const PredictionContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const PredictionText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
`;

const VideoPlayer = ({ videoUrl, prediction }) => {
  return (
    <VideoContainer>
      <VideoElement controls>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </VideoElement>
      <PredictionContainer>
        <h3>Predicción de la IA</h3>
        <PredictionText>{prediction}</PredictionText>
      </PredictionContainer>
    </VideoContainer>
  );
};

export default VideoPlayer;
