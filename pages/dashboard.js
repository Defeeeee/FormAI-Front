import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoList from '../components/VideoList';
import UploadSection from '../components/UploadSection';

const Dashboard = () => {
  useEffect(() => {
    const redirectIfNotLoggedIn = async () => {
      const { redirectIfNotLoggedIn } = await import('../js/auth.js');
      redirectIfNotLoggedIn();
    };
    redirectIfNotLoggedIn();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="dashboard-container">
        <div className="container">
          <h2>Dashboard</h2>
          <div className="dashboard-content">
            <section className="video-history">
              <h3>Historial de Videos</h3>
              <VideoList />
              <div className="history-link">
                <a href="historial">Ver Historial Completo</a>
              </div>
            </section>
            <section className="upload-video">
              <h3>Subir Nuevo Video</h3>
              <div className="upload-sections">
                <UploadSection exerciseId="1" exerciseName="Sentadilla" />
                <UploadSection exerciseId="2" exerciseName="Plank" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
