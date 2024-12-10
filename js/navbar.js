document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('nav');
    const userId = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');

    const currentPage = window.location.pathname.split('/').pop();

    const menuItems = [
        { name: 'Inicio', href: '/' },
        { name: 'Dashboard', href: 'dashboard' },
        { name: 'Historial', href: 'historial' },
        { name: 'Perfil', href: 'perfil' }
    ];

    const menuLinks = menuItems.map(item => {
        const isActive = currentPage === item.href ? 'active' : '';
        return `<li><a href="${item.href}" class="${isActive}">${item.name}</a></li>`;
    }).join('');

    if (userId && token) {
        navbar.innerHTML = `
            <div class="logo">
                <img src="../images/logo.png" alt="FōrmAI Logo">
            </div>
            <div class="menu-derecha">
                <ul>
                    ${menuLinks}
                </ul>
            </div>
        `;
    } else {
        navbar.innerHTML = `
            <div class="logo">
                <img src="../images/logo.png" alt="FōrmAI Logo">
            </div>
            <div class="menu-derecha">
                <ul>
                    ${menuLinks}
                </ul>
                <button class="btn-register">Register</button>
                <button class="btn-login">Login</button>
            </div>
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

    const menuToggle = document.querySelector('.menu-toggle');
    const menuDerecha = document.querySelector('.menu-derecha');

    menuToggle.addEventListener('click', () => {
        menuDerecha.classList.toggle('show');
        menuToggle.style.display = menuDerecha.classList.contains('show') ? 'none' : 'block';
    });
});
