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

// Función para obtener los usuarios desde localStorage
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Función para guardar los usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Verificar si la base de datos de usuarios existe, si no, inicializarla
if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [
        { id: 1, nombre: "Carlos Gómez", rol: "comprador", contraseña: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}

// Manejo del formulario de inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Obtener los usuarios y verificar si el usuario existe
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.nombre === username);

    if (usuario && usuario.contraseña === password) {
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
    const userRole = document.getElementById('user-role').value;

    if (!userRole) {
        alert('Por favor selecciona un rol (comprador o vendedor).');
        return;
    }

    if (newPassword === confirmPassword) {
        const usuarios = obtenerUsuarios();
        const nuevoUsuario = {
            id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
            nombre: newUsername,
            rol: userRole,
            contraseña: newPassword
        };

        usuarios.push(nuevoUsuario);
        guardarUsuarios(usuarios);

        alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    } else {
        alert('Las contraseñas no coinciden.');
    }
});
