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
                <a href="/" class="logolink"><img src="../images/logo.png" alt="FōrmAI Logo"></a>
            </div>
            <div class="menu-derecha">
                <ul>
                    ${menuLinks}
                </ul>
            </div>
        `;
    } else {
        const isActive1 = currentPage === 'register'
        const isActive2 = currentPage === 'login'
        const isActive3 = currentPage === 'quienes-somos'
        console.log(currentPage, isActive1, isActive2, isActive3);
        navbar.innerHTML = `
            <div class="logo">
                <a href="/" class="logolink"><img src="../images/logo.png" alt="FōrmAI Logo"></a>
            </div>
            <div class="menu-derecha">
                <ul>
                    <li><a href="register" class=${isActive1}>Registrarse</a></li>
                    <li><a href="login" class=${isActive2}>Iniciar sesión</a></li>
                    <li><a href="quienes-somos" class=${isActive3}>Quienes Somos</a></li>
                </ul>
            </div>
        `;

        const registerButton = document.querySelector('a[href="register"]');
        const loginButton = document.querySelector('a[href="login"]');
        const quienesSomosButton = document.querySelector('a[href="quienes-somos"]');

        registerButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'register';
        });

        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'login';
        });

        quienesSomosButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'quienes-somos';
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const menuDerecha = document.querySelector('.menu-derecha');

    menuToggle.addEventListener('click', () => {
        menuDerecha.classList.toggle('show');
        menuToggle.style.display = menuDerecha.classList.contains('show') ? 'none' : 'block';
    });
});
