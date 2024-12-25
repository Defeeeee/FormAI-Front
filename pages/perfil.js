import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Perfil = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('token');

      if (!userId || !token) {
        console.error('User ID or token not found in session storage.');
        alert('Error: No se pudo obtener la información del usuario.');
        return;
      }

      try {
        const response = await fetch(`https://db.formaitic.me/usuarios/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setNombre(userData.usuario || '');
          setEmail(userData.email || '');
        } else {
          console.error('Error fetching user information:', response.status);
          alert('Error al cargar la información del usuario.');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Error de red al cargar la información del usuario.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');

    if (!userId || !token) {
      console.error('User ID or token not found in session storage.');
      alert('Error: No se pudo obtener la información del usuario.');
      return;
    }

    const formData = {
      usuario: nombre,
      email: email,
      pass: password
    };

    try {
      const response = await fetch(`https://db.formaitic.me/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Perfil actualizado exitosamente:', data);
        setSuccess('¡Perfil actualizado exitosamente!');
      } else {
        const errorData = await response.json();
        if (errorData.message) {
          if (errorData.message.includes('email')) {
            setError('Correo electrónico inválido.');
          } else if (errorData.message.includes('contraseña')) {
            setError('Contraseña incorrecta.');
          } else {
            alert(`Error al actualizar el perfil: ${errorData.message}`);
          }
        } else {
          alert('Error al actualizar el perfil. Por favor, inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error en la conexión con el servidor.');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = 'login';
  };

  return (
    <>
      <Navbar />
      <div className="perfil-container">
        <img src="../images/logo.png" alt="FōrmAI Logo" className="logo" />

        <form id="perfilForm" className="perfil-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre de Usuario</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese su nombre de usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingrese su correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="perfil-button">Actualizar Perfil</button>
          <button type="button" id="logoutButton" className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </form>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </>
  );
};

export default Perfil;
