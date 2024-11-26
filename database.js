// Comprobamos si ya existe la base de datos en el localStorage
if (!localStorage.getItem("productos")) {
    // Si no existe, inicializamos con algunos productos de ejemplo
    const productosIniciales = [
        { id: 1, nombre: "Laptop HP", precio: 8500, vendedor: "Juan Pérez", Descripcion: "Potente y elegante laptop con procesador de última generación, pantalla Full HD, almacenamiento rápido SSD y batería de larga duración", Stock: 40},
        { id: 2, nombre: "Teléfono Xiaomi", precio: 3500, vendedor: "Maria López", Descripcion: "Smartphone moderno con cámara de alta resolución, batería de larga duración, pantalla AMOLED vibrante y rendimiento rápido", Stock: 37 },
        { id: 3, nombre: "Cámara Digital Canon", precio: 2500, vendedor: "Carlos Gómez", Descripcion: "Cámara profesional con sensor de alta resolución, enfoque rápido, estabilización avanzada y conectividad inalámbrica", Stock: 7 },
        { id: 4, nombre: "Silla Gaming", precio: 1500, vendedor: "Ana Fernández", Descripcion: "Silla gamer ergonómica con diseño premium, cojines ajustables, reclinación de 180°, reposabrazos 4D y materiales duraderos", Stock: 11 },
        { id: 5, nombre: "Control para Xbox", precio: 1463, vendedor: "Juan Manuel", Descripcion: "Control de Xbox con diseño ergonómico, respuesta táctil precisa, gatillos sensibles y conectividad inalámbrica", Stock: 13 },
        { id: 6, nombre: "Bolsa para Dama", precio: 3300, vendedor: "Natalia Tenopala", Descripcion: "Bolsa para dama con diseño elegante, amplio espacio interior, compartimentos organizados y materiales de alta calidad", Stock: 17 },
        { id: 7, nombre: "I phone 13", precio: 8200, vendedor: "Daniel Hernandez", Descripcion: "iPhone 13 con pantalla Super Retina XDR, chip A15 Bionic, cámara de alta calidad y batería de larga duración. Rendimiento excepcional", Stock: 19 },
        { id: 8, nombre: "Audifonos Maxwell", precio: 7400, vendedor: "Angel Orozco", Descripcion: "Audífonos inalámbricos con sonido de alta calidad, cancelación de ruido, batería de larga duración y diseño cómodo.", Stock: 23 },
        { id: 9, nombre: "Adidas Response", precio: 1800, vendedor: "Hugo Santos", Descripcion: "Calzado y ropa Adidas con diseño innovador, tecnología de alto rendimiento y comodidad excepcional", Stock: 40 }
    ];
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

if (!localStorage.getItem("usuarios")) {
    // Si no existe, inicializamos con un usuario de ejemplo
    const usuariosIniciales = [
        { id: 1, nombre: "Carlos Gómez", Rol: "Vendedor", contraseña: "1234" }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}

if (!localStorage.getItem("carrito")) {
    const carritoInicial = [];
    localStorage.setItem("carrito", JSON.stringify(carritoInicial));
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
    return usuarios.find(usuario => usuario.nombre === correo && usuario.contraseña === contraseña);
}
