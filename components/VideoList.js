import React, { useEffect, useState } from 'react';

const VideoList = ({ userId, token }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoHistory = async () => {
      try {
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
  }, [userId, token]);

  return (
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
  );
};

export default VideoList;
