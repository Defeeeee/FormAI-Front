// Scroll Animations

function checkScroll() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    scrollElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('show');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // Initial check on page load

// Header Scroll Change

const header = document.querySelector('.header');

function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// Smooth Scrolling for Navigation Links

const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy Loading for Images

const images = document.querySelectorAll('img[data-src]');

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }
    img.src = src;
}

const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 200px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

// Form Validation (Example for a Contact Form)

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.querySelector('#name');
        const emailInput = document.querySelector('#email');
        const messageInput = document.querySelector('#message');

        if (nameInput.value === '') {
            alert('Por favor, ingresa tu nombre.');
            return;
        }

        if (emailInput.value === '') {
            alert('Por favor, ingresa tu correo electrónico.');
            return;
        }

        if (messageInput.value === '') {
            alert('Por favor, ingresa tu mensaje.');
            return;
        }

        // Here you would typically submit the form data to your server
        alert('¡Formulario enviado con éxito!');
        contactForm.reset();
    });
}