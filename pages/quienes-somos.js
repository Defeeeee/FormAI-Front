import React from 'react';
import Navbar from '../components/Navbar';

const QuienesSomos = () => {
  return (
    <div>
      <Navbar />

      <main className="quienes-somos-container">
        <div className="container">
          <h2>Quienes Somos</h2>
          <div className="developer">
            <img src="../images/federico.jpg" alt="Federico Diaz Nemeth" />
            <div className="developer-info">
              <h3>Federico Diaz Nemeth</h3>
              <p>Federico desarrolló la inteligencia artificial que impulsa FōrmAI. Su experiencia en aprendizaje automático y análisis de datos ha sido fundamental para crear un sistema preciso y eficiente.</p>
            </div>
          </div>
          <div className="developer">
            <img src="../images/eric.jpg" alt="Eric Gerzenstein" />
            <div className="developer-info">
              <h3>Eric Gerzenstein</h3>
              <p>Eric es el desarrollador del backend de FōrmAI. Su habilidad para diseñar y mantener sistemas robustos asegura que nuestra plataforma funcione sin problemas y de manera segura.</p>
            </div>
          </div>
          <div className="developer">
            <img src="../images/dan.jpg" alt="Dan Segal" />
            <div className="developer-info">
              <h3>Dan Segal</h3>
              <p>Dan es el responsable del diseño de la experiencia de usuario y la interfaz de usuario de FōrmAI. Su enfoque en la usabilidad y la estética garantiza que nuestra plataforma sea intuitiva y atractiva.</p>
            </div>
          </div>
          <div className="developer">
            <img src="../images/juan.jpg" alt="Juan Baader" />
            <div className="developer-info">
              <h3>Juan Baader</h3>
              <p>Juan es el desarrollador del frontend de FōrmAI. Su experiencia en tecnologías web modernas asegura que nuestra plataforma sea rápida, receptiva y accesible en todos los dispositivos.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuienesSomos;
