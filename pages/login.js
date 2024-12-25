import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Login() {
  return (
    <div>
      <Head>
        <title>FōrmAI - Inicio de Sesión</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <div className="login-container">
        <img src="../images/logo.png" alt="FōrmAI Logo" className="logo" />

        <form id="loginForm" className="login-form">
          <div className="form-group">
            <label htmlFor="email">Mail</label>
            <input type="email" id="email" name="email" placeholder="Ingrese su correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>

        <div className="register-link">
          ¿No tienes cuenta? <a href="../register">Regístrate</a>
        </div>
      </div>

      <script src="../js/login.js"></script>
      <script src="../js/navbar.js"></script>
    </div>
  );
}
