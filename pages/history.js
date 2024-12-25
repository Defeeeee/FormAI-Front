import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const History = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoHistory = async () => {
      try {
        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        if (!userId || !token) {
          console.error('User ID or token not found in session storage.');
          return;
        }

        const response = await fetch(`https://db.formaitic.me/videos/usuario/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const videos = await response.json();
          setVideos(videos);
        } else {
          console.error('Error fetching video history:', response.status);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchVideoHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="history-container">
        <div className="container">
          <h2>Historial de Videos</h2>
          <ul className="video-list">
            {videos.length === 0 ? (
              <li>No hay videos en tu historial.</li>
            ) : (
              videos.map((video, index) => {
                const ejercicio = video.id_ejercicio === 1 ? 'Sentadilla' : 'Plank';
                const correcto = video.correcto ? 'Correcto' : 'Incorrecto';
                const videoVisualizerUrl = `video-visualizer?url=${encodeURIComponent(video.url)}&prediction=${encodeURIComponent(correcto)}`;

                return (
                  <li key={index}>
                    <span>Video {index + 1} - {ejercicio} ({correcto})</span>
                    <a href={videoVisualizerUrl}>Ver video</a>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default History;
