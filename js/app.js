// Selección de elementos del DOM
const contenedorDestacados = document.querySelector("#productos-destacados");

let carritoCount = 0;

// Simulación de carga asíncrona de datos mediante Promises y setTimeout
function obtenerProductosSimulados() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 800); // Simula 800ms de latencia de red
  });
}

// Función para renderizar tarjetas en el DOM
function renderizarProductos(listaProductos) {
  contenedorDestacados.innerHTML = "";

  const destacados = listaProductos
  .filter(prod => prod.destacado)
  .slice(0, 4); // Limita a los primeros 4 productos destacados

  destacados.forEach(producto => {
    const article = document.createElement("article");
    article.classList.add("card");

    article.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="card-body">
        <h3 class="card-title">${producto.nombre}</h3>
        <p class="card-description">${producto.descripcion}</p>
        <p class="card-price">$${producto.precio.toLocaleString('es-AR')}</p>
        <button class="btn-primary btn-agregar" data-id="${producto.id}">Añadir al Carrito</button>
      </div>
    `;

    contenedorDestacados.appendChild(article);
  });

  escucharBotonesAgregar();
}



// Flujo principal de ejecución asíncrona
async function iniciarApp() {
  contenedorDestacados.innerHTML = "<p>⏳ Cargando piezas destacadas...</p>";
  
  try {
    const datosProductos = await obtenerProductosSimulados();
    renderizarProductos(datosProductos);
  } catch (error) {
    contenedorDestacados.innerHTML = "<p>❌ Error al cargar el catálogo.</p>";
  }
}

document.addEventListener("DOMContentLoaded", iniciarApp);