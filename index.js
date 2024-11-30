// Selección de elementos del DOM
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

// Función para alternar entre el inicio de sesión y la creación de cuenta
switchToSignup.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

switchToLogin.addEventListener('click', () => {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// Manejo del formulario de inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar si el usuario existe en localStorage
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
        // Redirigir a la página principal
        window.location.href = 'principal.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Manejo del formulario de creación de cuenta
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword === confirmPassword) {
        const user = { username: newUsername, password: newPassword };
        localStorage.setItem(newUsername, JSON.stringify(user));
        alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    } else {
        alert('Las contraseñas no coinciden.');
    }
});

// Selección de elementos del menú de hamburguesa
const hamburgerIcon = document.getElementById('hamburger-icon');
const navMenu = document.getElementById('nav-menu');

// Función para abrir y cerrar el menú de hamburguesa
hamburgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
