import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>FŌRMAI - Tu Entrenador IA para una Forma Perfecta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </Head>

      <Navbar />

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Logra la Forma Perfecta con <span className="highlight">FōrmAI</span></h1>
              <p>Tu entrenador personal con inteligencia artificial que analiza y corrige tus ejercicios de gimnasio en tiempo real.</p>
              <a href="/register" className="btn">Sube tu video ahora</a>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Cómo funciona</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3>Graba tu ejercicio</h3>
              <p>Graba un video de ti mismo realizando el ejercicio que deseas analizar.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-upload"></i>
              </div>
              <h3>Sube tu video</h3>
              <p>Sube tu video a la plataforma FŌRMAI de forma rápida y sencilla.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Análisis con IA</h3>
              <p>Nuestra IA analizará tu forma y técnica en tiempo real.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Recibe feedback</h3>
              <p>Obtén retroalimentación detallada sobre tu postura, alineación y ejecución.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit">
              <i className="fas fa-user-check benefit-icon"></i>
              <h3>Entrenamiento personalizado</h3>
              <p>FŌRMAI se adapta a tu nivel y objetivos, brindándote un plan de entrenamiento a medida.</p>
            </div>
            <div className="benefit">
              <i className="fas fa-shield-alt benefit-icon"></i>
              <h3>Prevención de lesiones</h3>
              <p>Al corregir tu forma, FŌRMAI te ayuda a evitar lesiones y entrenar de manera segura.</p>
            </div>
            <div className="benefit">
              <i className="fas fa-medal benefit-icon"></i>
              <h3>Motivación constante</h3>
              <p>FŌRMAI te anima a superarte con seguimiento de progreso y desafíos motivadores.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>¿Listo para transformar tu entrenamiento?</h2>
          <a href="register" className="btn">Pruébalo ahora</a>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 FŌRMAI. Todos los derechos reservados.</p>
        </div>
      </footer>

      <script src="../js/home.js"></script>
      <script src="../js/navbar.js"></script>
    </div>
  );
}
