// 1. Leer la barra de direcciones para buscar el parámetro 'id'
const parametrosURL = new URLSearchParams(window.location.search);
const productoId = parseInt(parametrosURL.get('id'));

// 2. Buscar el mueble en la "base de datos" (el array que creaste antes)
const productoSeleccionado = productos.find(producto => producto.id === productoId);

// 3. Modificar el HTML si el producto existe
if (productoSeleccionado) {
    // Reemplazar los textos simples
    document.querySelector('.titulo-producto').textContent = productoSeleccionado.nombre;
    document.querySelector('.descripcion-producto').textContent = productoSeleccionado.descripcion;
    
    // Darle formato de moneda al precio
    document.querySelector('.precio-producto').textContent = `$${productoSeleccionado.precio.toLocaleString('es-AR')}`;
    
    // Cambiar la ruta de la imagen y su texto alternativo
    const imagenElemento = document.querySelector('.product-image');
    imagenElemento.src = productoSeleccionado.imagen;
    imagenElemento.alt = productoSeleccionado.nombre;

    // Generar la lista de detalles dinámicamente
    const listaDetalles = document.querySelector('.detalles-producto');
    listaDetalles.innerHTML = ''; // Borra el texto de prueba que dejamos en el HTML
    
    // Recorrer el sub-array de detalles y crear una viñeta <li> por cada uno
    productoSeleccionado.detalles.forEach(detalle => {
        //const li = document.createElement('li');
        //li.textContent = detalle;
        //listaDetalles.appendChild(li);
        const partes = detalle.split(':');
        const titulo = partes[0];
        // trim() elimina los espacios en blanco sobrantes al inicio
        const valor = partes[1].trim(); 

        const li = document.createElement('li');
        // Creamos dos <span> distintos para poder estilizarlos en CSS
        li.innerHTML = `<span class="detalle-titulo">${titulo}</span><span class="detalle-valor">${valor}</span>`;
        listaDetalles.appendChild(li);
    });
} else {
    // Si el usuario ingresa un ID que no existe (ej. ?id=99)
    document.querySelector('.contenedor-producto').innerHTML = '<h2 style="text-align:center; width:100%; color:#A0522D;">Producto no encontrado</h2>';
}