document.addEventListener('DOMContentLoaded', () => {
    const perfilForm = document.getElementById('perfilForm');
    const nombreInput = document.getElementById('nombre');
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

    // Real-time validation for username
    nombreInput.addEventListener('input', () => {
        removeError(nombreInput);
        const nombre = nombreInput.value;
        if (nombre.length < 4) {
            showError(nombreInput, 'El nombre de usuario debe tener al menos 4 caracteres.');
        }
    });

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

    perfilForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Remove any existing error messages
        removeError(nombreInput);
        removeError(emailInput);
        removeError(passwordInput);

        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        // Check if userId and token are available
        if (!userId || !token) {
            console.error('User ID or token not found in session storage.');
            alert('Error: No se pudo obtener la información del usuario.');
            return;
        }

        const formData = {
            nombre: nombreInput.value,
            email: emailInput.value,
            password: passwordInput.value
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

                // Display a success message on the page
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = '¡Perfil actualizado exitosamente!';
                perfilForm.parentNode.insertBefore(successMessage, perfilForm);

                // Optionally, you can add a delay to remove the success message
                setTimeout(() => {
                    successMessage.remove();
                }, 3000); // Remove after 3 seconds

            } else {
                const errorData = await response.json();
                // Handle specific error messages from the API
                if (errorData.message) {
                    if (errorData.message.includes('email')) {
                        showError(emailInput, 'Correo electrónico inválido.');
                    } else if (errorData.message.includes('contraseña')) {
                        showError(passwordInput, 'Contraseña incorrecta.');
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
    });

    // Fetch user information and populate the form
    async function fetchUserInfo() {
        const userId = sessionStorage.getItem('id');
        const token = sessionStorage.getItem('token');

        // Check if userId and token are available
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
                nombreInput.value = userData.nombre || '';
                emailInput.value = userData.email || '';
            } else {
                console.error('Error fetching user information:', response.status);
                alert('Error al cargar la información del usuario.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Error de red al cargar la información del usuario.');
        }
    }

    fetchUserInfo();
});
