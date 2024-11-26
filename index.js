// Selección de elementos del DOM
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');

// Función para alternar entre formularios
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

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito"));
}

// Función para guardar los usuarios en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(usuario, nombrePedido, cantidad, precio) {
    const carrito = obtenerCarrito();

    // Verificamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombrePedido === nombrePedido && item.usuario === usuario);
    
    if (productoExistente) {
        // Si el producto ya existe, solo actualizamos la cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si el producto no existe, lo agregamos como un nuevo item
        const nuevoProducto = {
            usuario: usuario,
            nombrePedido: nombrePedido,
            cantidad: cantidad,
            precio: precio
        };
        carrito.push(nuevoProducto);
    }

    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar base de datos de usuarios si no existe
if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [
        { id: 1, nombre: "Carlos Gómez", rol: "comprador", contraseña: "1234" }
    ];
    guardarUsuarios(usuariosIniciales);
}

// Manejo del formulario de inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.nombre === username && u.contraseña === password);

    if (usuario) {
        alert(`¡Bienvenido, ${usuario.nombre}! Rol: ${usuario.rol}`);
        window.location.href = 'principal.html'; // Redirigir a la página principal
    } else {
        alert('Usuario o contraseña incorrectos.');
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
