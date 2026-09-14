// Arreglo de productos con los datos oficiales del caso
const productos = [
    { 
        codigo: 'JM001', 
        categoria: 'Juegos de Mesa', 
        nombre: 'Catan', 
        precio: 29990, 
        imagen: 'https://i5.walmartimages.com/asr/eb12816f-c1b7-4638-89c0-3b2d6a5c2d3a_1.c0631f98bc01d51a66dc10c2fcad41ec.jpeg' 
    },
    { 
        codigo: 'AC002', 
        categoria: 'Accesorios', 
        nombre: 'Auriculares Gamer HyperX Cloud II', 
        precio: 79990, 
        imagen: 'https://i5.walmartimages.com/asr/3f28320b-2df8-4e18-87cb-1cd2af2d5396_1.d7a86f1e29e9d6d3fc2279cd191d8e13.jpeg' 
    },
    { 
        codigo: 'CO001', 
        categoria: 'Consolas', 
        nombre: 'PlayStation 5', 
        precio: 549990, 
        imagen: 'https://m.media-amazon.com/images/I/619BkvKW35L._AC_SL1500_.jpg' 
    },
    { 
        codigo: 'CG001', 
        categoria: 'Computadores Gamers', 
        nombre: 'PC Gamer ASUS ROG Strix', 
        precio: 1299990, 
        imagen: 'https://i5.walmartimages.com/asr/2070e34c-60db-4f0e-8f96-3e3c668b5a03.2de9910d5dc3e00cfbe31889a7442152.jpeg' 
    },
    { 
        codigo: 'SG001', 
        categoria: 'Sillas Gamers', 
        nombre: 'Silla Gamer Secretlab Titan', 
        precio: 349990, 
        imagen: 'https://i5.walmartimages.com/asr/c88f1dc6-d4f1-43e4-86a0-53bc325ddf82.162f1c841804f5e7144e0078eb170cf8.jpeg' 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-productos');
    productos.forEach(producto => {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta-producto');
        
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            <div class="categoria-badge">${producto.categoria}</div>
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio.toLocaleString('es-CL')} CLP</p>
            <button class="btn-primary" onclick="agregarAlCarrito('${producto.codigo}', '${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al Carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
});