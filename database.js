// Comprobamos si ya existe la base de datos en el localStorage
if (!localStorage.getItem("productos")) {
    // Si no existe, inicializamos con algunos productos de ejemplo
    const productosIniciales = [
        { id: 1, nombre: "Laptop HP", precio: 8500, vendedor: "Juan Pérez", estado: "Semiusado" },
        { id: 2, nombre: "Teléfono Xiaomi", precio: 3500, vendedor: "Maria López", estado: "Nuevo" },
        { id: 3, nombre: "Cámara Digital Canon", precio: 2500, vendedor: "Carlos Gómez", estado: "Usado" },
        { id: 4, nombre: "Silla Gaming", precio: 1500, vendedor: "Ana Fernández", estado: "Nuevo" },
        { id: 5, nombre: "Control para Xbox", precio: 1463, vendedor: "Juan Manuel", estado: "Usado" },
        { id: 6, nombre: "Bolsa para Dama", precio: 3300, vendedor: "Natalia Tenopala", estado: "Semiusado" },
        { id: 7, nombre: "I phone 13", precio: 8200, vendedor: "Daniel Hernandez", estado: "Usado" },
        { id: 8, nombre: "Audifonos Maxwell", precio: 7400, vendedor: "Angel Orozco", estado: "Semiusado" },
        { id: 9, nombre: "Adidas Response", precio: 1800, vendedor: "Hugo Santos", estado: "Nuevo" }
    ];
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

if (!localStorage.getItem("usuarios")) {
    // Si no existe, inicializamos con un usuario de ejemplo
    const usuariosIniciales = [
        { id: 1, nombre: "Carlos Gómez", correo: "carlos@example.com", contraseña: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}

// Función para obtener los productos almacenados
function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos"));
}

// Función para obtener los usuarios almacenados
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios"));
}

// Función para agregar un producto
function agregarProducto(producto) {
    const productos = obtenerProductos();
    producto.id = productos.length + 1; // Generamos un ID único para el producto
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para registrar un nuevo usuario
function registrarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuario.id = usuarios.length + 1; // Generamos un ID único para el usuario
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para autenticar un usuario (login)
function autenticarUsuario(correo, contraseña) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.correo === correo && usuario.contraseña === contraseña);
}
