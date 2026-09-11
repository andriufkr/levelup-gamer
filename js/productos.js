// Arreglo de productos con los datos oficiales del caso
const productos = [
    { codigo: 'JM001', categoria: 'Juegos de Mesa', nombre: 'Catan', precio: 29990 },
    { codigo: 'AC002', categoria: 'Accesorios', nombre: 'Auriculares Gamer HyperX Cloud II', precio: 79990 },
    { codigo: 'CO001', categoria: 'Consolas', nombre: 'PlayStation 5', precio: 549990 },
    { codigo: 'CG001', categoria: 'Computadores Gamers', nombre: 'PC Gamer ASUS ROG Strix', precio: 1299990 },
    { codigo: 'SG001', categoria: 'Sillas Gamers', nombre: 'Silla Gamer Secretlab Titan', precio: 349990 }
]; // Datos extraídos de la pauta[cite: 3]

// Función para mostrar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-productos');

    // Recorremos el arreglo para generar el HTML de cada producto
    productos.forEach(producto => {
        // Creamos un elemento article para cada tarjeta (cumple semántica HTML5)
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');

        tarjeta.innerHTML = `
            <div class="categoria-badge">${producto.categoria}</div>
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</p>
            <button class="btn-primary" onclick="agregarAlCarrito('${producto.codigo}', '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        `;

        contenedor.appendChild(tarjeta);
    });
});