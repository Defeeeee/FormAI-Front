document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('nav');
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');

    if (userId && token) {
        navbar.innerHTML = `
            <div class="logo">
                <img src="../images/logo.png" alt="FōrmAI Logo">
            </div>
            <div class="menu-derecha">
                <ul>
                    <li><a href="/" class="active">Inicio</a></li>
                    <li><a href="dashboard">Dashboard</a></li>
                    <li><a href="historial">Historial</a></li>
                </ul>
                <a href="perfil" class="profile-link">
                    <img src="../images/profile-icon.png" alt="Perfil" class="profile-icon">
                </a>
            </div>
        `;
    } else {
        navbar.innerHTML = `
            <div class="logo">
                <img src="../images/logo.png" alt="FōrmAI Logo">
            </div>
            <button class="btn-register">Register</button>
            <button class="btn-login">Login</button>
        `;
        const registerButton = document.querySelector('.btn-register');
        const loginButton = document.querySelector('.btn-login');

        registerButton.addEventListener('click', () => {
            window.location.href = '/register';
        });

        loginButton.addEventListener('click', () => {
            window.location.href = '/login';
        });
    }
});
