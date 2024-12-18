const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to display error messages
function showError(inputField, message) {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = message;
    inputField.parentNode.insertBefore(errorSpan, inputField.nextSibling);
    inputField.classList.add('error');
}

// Function to remove error messages
function removeError(inputField) {
    const errorSpan = inputField.parentNode.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.remove();
        inputField.classList.remove('error');
    }
}

// Real-time validation for email
emailInput.addEventListener('input', () => {
    removeError(emailInput);
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Por favor, ingresa un correo electrónico válido.');
    }
});

// Real-time validation for password
passwordInput.addEventListener('input', () => {
    removeError(passwordInput);
    if (passwordInput.value.length < 6) {
        showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Remove any existing error messages
    removeError(emailInput);
    removeError(passwordInput);

    const email = emailInput.value;
    const password = passwordInput.value;

    // Basic client-side validation (you can add more as needed)
    if (!email) {
        showError(emailInput, 'Por favor, ingresa tu correo electrónico.');
        return;
    }
    if (!password) {
        showError(passwordInput, 'Por favor, ingresa tu contraseña.');
        return;
    }

    try {
        const response = await fetch('https://db.formaitic.me/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, pass: password }) // Using "pass" as per your API
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Inicio de sesión exitoso:', data);

            // Store the token in sessionStorage
            sessionStorage.setItem('token', data.token);

            // Store the user ID in sessionStorage
            sessionStorage.setItem('id', data.id);

            // Redirect to the home page or a protected page
            window.location.href = '/dashboard';
        } else {
            const errorData = await response.json();
            // Handle specific error messages from the API
            if (errorData.message) {
                if (errorData.message.includes('email')) {
                    showError(emailInput, 'Correo electrónico inválido.');
                } else if (errorData.message.includes('contraseña')) {
                    showError(passwordInput, 'Contraseña incorrecta.');
                } else {
                    alert(`Error de inicio de sesión: ${errorData.message}`);
                }
            } else {
                alert('Error de inicio de sesión. Por favor, inténtalo de nuevo.');
            }
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
        alert('Error en la conexión con el servidor.');
    }
});
