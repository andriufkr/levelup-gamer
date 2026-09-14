// Obtener carrito del localStorage o iniciar un arreglo vacío
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoLevelUp')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carritoLevelUp', JSON.stringify(carrito)); // Exigencia de persistencia EV1
    renderizarCarrito();
}

// Agregar producto (se llamará desde productos.html)
// Actualiza esta función en tu js/carrito.js
function agregarAlCarrito(codigo, nombre, precio, imagen) {
    let carrito = obtenerCarrito();
    const itemExistente = carrito.find(item => item.codigo === codigo);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ codigo, nombre, precio, cantidad: 1, imagen }); // Se guarda la imagen
    }
    
    guardarCarrito(carrito);
    alert(`${nombre} agregado al carrito.`);
}

// Modificar cantidad (Sumar o Restar)
function modificarCantidad(codigo, cambio) {
    let carrito = obtenerCarrito();
    const item = carrito.find(i => i.codigo === codigo);
    
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.codigo !== codigo); // Eliminar producto si llega a 0[cite: 4]
        }
        guardarCarrito(carrito);
    }
}

// Mostrar los productos y calcular totales[cite: 3]
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById('items-carrito');
    
    if (!contenedor) return; // Evita errores si no estamos en carrito.html

    contenedor.innerHTML = '';
    let subtotal = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            subtotal += item.precio * item.cantidad;
            contenedor.innerHTML += `
                <article class="tarjeta-producto carrito-item">
                    <img src="${item.imagen}" alt="${item.nombre}" class="thumbnail-carrito">
                    <div class="info-carrito">
                        <h4>${item.nombre}</h4>
                        <p>Precio Unitario: $${item.precio.toLocaleString('es-CL')}</p>
                    </div>
                    <div class="controles-carrito">
                        <button onclick="modificarCantidad('${item.codigo}', -1)">-</button> 
                        <span>${item.cantidad}</span> 
                        <button onclick="modificarCantidad('${item.codigo}', 1)">+</button>
                    </div>
                </article>
            `;
        });
    }

    // Regla de Negocio: Descuento Duoc
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    let descuento = 0;
    
    if (usuarioActivo && usuarioActivo.esDuoc) {
        descuento = subtotal * 0.20; // 20% de descuento[cite: 3]
    }

    const total = subtotal - descuento;

    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('descuento-duoc').textContent = `-$${descuento.toLocaleString('es-CL')}`;
    document.getElementById('total-pagar').textContent = `$${total.toLocaleString('es-CL')}`;
}

// Inicializar renderizado al cargar la página
document.addEventListener('DOMContentLoaded', renderizarCarrito);