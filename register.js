const registerForm = document.getElementById('registerForm');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

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
nombreInput.addEventListener('input', async () => {
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

// Real-time validation for confirm password
confirmPasswordInput.addEventListener('input', () => {
    removeError(confirmPasswordInput);
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
    }
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Remove any existing error messages
    removeError(nombreInput);
    removeError(emailInput);
    removeError(passwordInput);
    removeError(confirmPasswordInput);

    // Perform final validation
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Las contraseñas no coinciden.');
        return;
    }

    try {
        const formData = {
            usuario: nombreInput.value,
            email: emailInput.value,
            pass: passwordInput.value
        };

        const response = await fetch('https://db.formaitic.me/usuarios/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Display a success message on the page
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = '¡Registro exitoso!';
            registerForm.parentNode.insertBefore(successMessage, registerForm);

            registerForm.reset();

            // Optionally, you can add a delay to remove the success message
            setTimeout(() => {
                successMessage.remove();
            }, 3000); // Remove after 3 seconds

        } else {
            const errorData = await response.json();
            // Check if the error is related to missing fields
            if (errorData.message && errorData.message.includes('Missing fields')) {
                // If the API response includes details about missing fields, display them
                if (errorData.missingFields) {
                    errorData.missingFields.forEach(field => {
                        // Show error message next to the corresponding field
                        switch (field) {
                            case 'usuario':
                                showError(nombreInput, 'El nombre de usuario es requerido.');
                                break;
                            case 'email':
                                showError(emailInput, 'El correo electrónico es requerido.');
                                break;
                            case 'pass':
                                showError(passwordInput, 'La contraseña es requerida.');
                                break;
                        }
                    });
                } else {
                    alert('Faltan campos en el formulario.');
                }
            } else {
                // Handle other types of errors
                alert(`Error en el registro: ${errorData.message || 'Error desconocido'}`);
            }
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red. Por favor, inténtalo de nuevo más tarde.');
    }
});