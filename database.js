// Comprobamos si ya existe la base de datos en el localStorage
if (!localStorage.getItem("productos")) {
    // Si no existe, inicializamos con algunos productos de ejemplo
    const productosIniciales = [
        { id: 1, nombre: "Laptop HP", precio: 8500, vendedor: "Juan Perez", Descripcion: "Potente y elegante laptop con procesador de última generación, pantalla Full HD, almacenamiento rápido SSD y batería de larga duración", Stock: 40,TotalVentas: 20},
        { id: 2, nombre: "Teléfono Xiaomi", precio: 3500, vendedor: "Juan Perez", Descripcion: "Smartphone moderno con cámara de alta resolución, batería de larga duración, pantalla AMOLED vibrante y rendimiento rápido", Stock: 37,TotalVentas: 19 },
        { id: 3, nombre: "Cámara Digital Canon", precio: 2500, vendedor: "Juan Perez", Descripcion: "Cámara profesional con sensor de alta resolución, enfoque rápido, estabilización avanzada y conectividad inalámbrica", Stock: 7,TotalVentas: 17 },
        { id: 4, nombre: "Silla Gaming", precio: 1500, vendedor: "Juan Perez", Descripcion: "Silla gamer ergonómica con diseño premium, cojines ajustables, reclinación de 180°, reposabrazos 4D y materiales duraderos", Stock: 11,TotalVentas: 13 },
        { id: 5, nombre: "Control para Xbox", precio: 1463, vendedor: "Juan Manuel", Descripcion: "Control de Xbox con diseño ergonómico, respuesta táctil precisa, gatillos sensibles y conectividad inalámbrica", Stock: 13,TotalVentas: 11 },
        { id: 6, nombre: "Bolsa para Dama", precio: 3300, vendedor: "Natalia Tenopala", Descripcion: "Bolsa para dama con diseño elegante, amplio espacio interior, compartimentos organizados y materiales de alta calidad", Stock: 17,TotalVentas: 7 },
        { id: 7, nombre: "I phone 13", precio: 8200, vendedor: "Daniel Hernandez", Descripcion: "iPhone 13 con pantalla Super Retina XDR, chip A15 Bionic, cámara de alta calidad y batería de larga duración. Rendimiento excepcional", Stock: 19,TotalVentas: 5 },
        { id: 8, nombre: "Audifonos Maxwell", precio: 7400, vendedor: "Angel Orozco", Descripcion: "Audífonos inalámbricos con sonido de alta calidad, cancelación de ruido, batería de larga duración y diseño cómodo.", Stock: 23,TotalVentas: 0 },
        { id: 9, nombre: "Adidas Response", precio: 1800, vendedor: "Hugo Santos", Descripcion: "Calzado y ropa Adidas con diseño innovador, tecnología de alto rendimiento y comodidad excepcional", Stock: 40,TotalVentas: 0 }
    ];
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

if (!localStorage.getItem("usuarios")) {
    // Si no existe, inicializamos con un usuario de ejemplo
    const usuariosIniciales = [
        { id: 1, nombre: "Juan Perez", Rol: "Vendedor", contraseña: "1234" , Conf1: 1 , Conf2: 1 },
        { id: 2, nombre: "Maria Lopez", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 3, nombre: "Carlos Gomez", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 4, nombre: "Ana Fernandez", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 5, nombre: "Juan Manuel", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 6, nombre: "Natalia Tenopala", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 7, nombre: "Daniel Hernandez", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 8, nombre: "Angel Orozco", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 },
        { id: 9, nombre: "Hugo Santos", Rol: "Vendedor", contraseña: "1234", Conf1: 1 , Conf2: 1 }
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
}

if (!localStorage.getItem("carrito")) {
    const carritoInicial = [];
    localStorage.setItem("carrito", JSON.stringify(carritoInicial));
}

if (!localStorage.getItem("transaccion")) {
    const transaccionInicial = [];
    localStorage.setItem("transaccion", JSON.stringify(transaccionInicial));
}

// Función para obtener los productos almacenados
function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos"));
}

// Función para obtener los usuarios almacenados
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios"));
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito"));
}

function obtenerTransaccion() {
    return JSON.parse(localStorage.getItem("transaccion"));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(usuario,nombreVendedor, nombrePedido, cantidad, precio) {
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
            nombreVendedor:nombreVendedor,
            nombrePedido: nombrePedido,
            cantidad: cantidad,
            precio: precio 
        };
        carrito.push(nuevoProducto);
    }

    // Guardamos el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarTransacciones() {
    // Obtenemos el carrito y las transacciones del localStorage
    const carrito = obtenerCarrito();
    let transacciones = obtenerTransaccion();

    // Recorremos los productos del carrito
    carrito.forEach(productoCarrito => {
        const { usuario, nombrePedido, nombreVendedor, cantidad, precio } = productoCarrito;
        // Verificamos si el producto ya está en transacciones
        const productoExistente = transacciones.find(item => item.nombrePedido === nombrePedido && item.usuario === usuario);
        if (productoExistente) {
            // Si el producto ya existe, actualizamos la cantidad
            productoExistente.cantidad += cantidad;
        } else {
            // Si el producto no existe, lo agregamos como un nuevo item
            const nuevoProducto = {
                usuario: usuario,
                nombreVendedor: nombreVendedor,
                nombrePedido: nombrePedido,
                cantidad: cantidad,
                precio: precio
            };
            transacciones.push(nuevoProducto);
        }
    });

    // Guardamos las transacciones actualizadas en el localStorage
    localStorage.setItem("transacciones", JSON.stringify(transacciones));
    console.log("Transacciones actualizadas:", transacciones);
}


// Función para agregar un producto
function agregarProducto(event) {
    event.preventDefault();
    let productos = JSON.parse(localStorage.getItem("productos"));
    if (!productos) {
        productos = []; 
    }

    const nombreNuevo = document.getElementById('nuevo-producto').value;
    const precioNuevo = parseFloat(document.getElementById('nuevo-precio').value); 
    const descripcionNuevo = document.getElementById('nuevo-descripcion').value;
    const stockNuevo = parseInt(document.getElementById('nuevo-stock').value); 
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));
    const siguienteId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    const nuevoProducto = {
        id: siguienteId,
        nombre: nombreNuevo,
        precio: precioNuevo,
        vendedor: usuarioGuardado.nombre,
        Descripcion: descripcionNuevo,
        Stock: stockNuevo,
        TotalVentas: 0
    };
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    alert('Producto publicado con éxito');
    console.log(localStorage.getItem("productos"))
    document.getElementById("formNuevoProducto").reset();
}

document.getElementById("formNuevoProducto").addEventListener("submit", agregarProducto);

// Función para registrar un nuevo usuario
function registrarUsuario(usuario) {
    const usuarios = obtenerUsuarios();
    usuario.id = usuarios.length + 1; 
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Función para autenticar un usuario (login)
function autenticarUsuario(correo, contraseña) {
    const usuarios = obtenerUsuarios();
    return usuarios.find(usuario => usuario.nombre === correo && usuario.contraseña === contraseña);
}
function verVentas(){
    switch (paginaActual){
        case 1: 
            document.getElementById('mensaje-inicio').style.display = 'none';
            break;
        case 2:
            document.getElementById('opcionesVendedor').style.display = 'none';
            document.getElementById('nuevoProducto').style.display = 'none';
            document.getElementById('modificarProducto').style.display = 'none';
            document.getElementById('eliminarProducto').style.display = 'none';
            break;
    }
    document.getElementById('statsVendedor').style.display = 'grid';
} 
function ventasTotales(){
    alert('Observar estadísticas de ventas');
    paginaActual = 3;
    console.log(paginaActual);
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));
    const vendedor = usuarioGuardado.nombre;
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productosVendedor = productos.filter(producto => producto.vendedor === vendedor);
    const nombresProductos = productosVendedor.map(producto => producto.nombre);
    const totalVentas = productosVendedor.map(producto => parseInt(producto.TotalVentas)|| 0);

    //creacion de grafica
    const ctx = document.getElementById("graficaVentas").getContext("2d");  
    new Chart(ctx, {
        type: 'bar',  // Tipo de gráfico (barras)
        data: {
            labels: nombresProductos,
            datasets: [{
                label: 'Total Ventas de productos',
                data: totalVentas,  // Datos de ventas
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)',  // Color del borde de las barras
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    console.log(productos);
}  
//función para eliminar artículos en venta
function eliminarArticulo() {
    alert("Aqui se muestran los artículos a la venta");
    document.getElementById('opcionesVendedor').style.display = 'none';
    document.getElementById('eliminarProducto').style.display = 'block';

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));
    const vendedor = usuarioGuardado.nombre;
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productosVendedor = productos.filter(producto => producto.vendedor === vendedor);

    const productListContainer = document.getElementById('productListContainerDos'); 
    productListContainer.innerHTML = '';

    productosVendedor.forEach((producto) => {
        const productElement = document.createElement("div");
        productElement.classList.add("productosVendedor");
        productElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Vendedor: ${producto.vendedor}</p>
            <p>Descripción: ${producto.Descripcion}</p>
            <p>Stock: ${producto.Stock}</p>
            <button onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
        `;

        productListContainer.appendChild(productElement);
    });

}
function eliminarProducto(nombreProducto) {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const productosActualizados = productos.filter(producto => producto.nombre !== nombreProducto);
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    eliminarArticulo();

}
//modificacion de artículos----------------------------------------------------------------------------------------
function modificarArticulo() {
    alert("Aqui se muestran los artículos a la venta");
    document.getElementById('opcionesVendedor').style.display = 'none';
    document.getElementById('modificarProducto').style.display = 'block';

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActual"));
    const vendedor = usuarioGuardado.nombre;
    const productos = JSON.parse(localStorage.getItem("productos"));

    const productosVendedor = productos.filter(producto => producto.vendedor === vendedor);
    const productListContainer = document.getElementById('productListContainerTres'); 
    productListContainer.innerHTML = '';

    productosVendedor.forEach((producto) => {
        const productElement = document.createElement("div");
        productElement.classList.add("productosVendedor");
        productElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Vendedor: ${producto.vendedor}</p>
            <p>Descripción: ${producto.Descripcion}</p>
            <p>Stock: ${producto.Stock}</p>
            <button onclick="modificarProducto('${producto.id}')">Modificar producto</button>
        `;
        productListContainer.appendChild(productElement);
    });
}
function modificarProducto(id){
    id = id*1
    console.log(typeof id)
    document.getElementById("productListContainerTres").style.display='none';
    document.getElementById("modificaProducto").style.display='block';
    const productos = JSON.parse(localStorage.getItem("productos"));
    productoLocal = productos.find(producto => producto.id === id);
    console.log(productoLocal)
    console.log(productoLocal.nombre)
    //para que se mantengan los valores
    document.getElementById('modifica-producto').value = productoLocal.nombre;
    document.getElementById('modifica-precio').value = productoLocal.precio;
    document.getElementById('modifica-descripcion').value = productoLocal.Descripcion;
    document.getElementById('modifica-stock').value = productoLocal.Stock;
    document.getElementById('guardar-cambios').onclick = function () {
        // Obtener los nuevos valores del formulario
        const nombreNuevo = document.getElementById('nuevo-producto').value;
        const precioNuevo = parseFloat(document.getElementById('nuevo-precio').value); 
        const descripcionNuevo = document.getElementById('nuevo-descripcion').value;
        const stockNuevo = parseInt(document.getElementById('nuevo-stock').value); 

        // Crear el nuevo objeto de producto con los valores modificados
        const productoModificado = { 
            id: productoLocal.id,
            nombre: nombreNuevo,          
            precio: precioNuevo,          
            vendedor: productoLocal.vendedor,
            Descripcion: descripcionNuevo,
            Stock: stockNuevo,            
            TotalVentas: productoLocal.TotalVentas
        };
    productoLocal = productoModificado;
    localStorage.setItem("productos", JSON.stringify(productoLocal));
    alert("Producto modificado correctamente.");
    document.getElementById("modificaProducto").style.display = 'none';
    document.getElementById("productListContainerTres").style.display = 'block';
    }

}

function actualizarVistaProductos() {
    const productListContainer = document.getElementById('productListContainerTres');
    productListContainer.innerHTML = '';
    const productos = JSON.parse(localStorage.getItem("productos"));
    productos.forEach((producto) => {
        const productElement = document.createElement("div");
        productElement.classList.add("productosVendedor");
        productElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Vendedor: ${producto.vendedor}</p>
            <p>Descripción: ${producto.Descripcion}</p>
            <p>Stock: ${producto.Stock}</p>
            <button onclick="modificarProducto(${producto.id})">Modificar producto</button>
        `;
        productListContainer.appendChild(productElement);
    });
}
    


    