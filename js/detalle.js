/*
// Envolvemos todo en una función asíncrona que espera a que el HTML cargue
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Leer el parámetro 'id' de la URL
    const parametrosURL = new URLSearchParams(window.location.search);
    const productoId = parseInt(parametrosURL.get('id'));

    try {
        // 2. Conectar con el archivo JSON (Reemplaza 'productos.json' con la ruta real si está en otra carpeta)
        const respuesta = await fetch('./db/products.json');
        const productos = await respuesta.json();

        // 3. Buscar el mueble en el array obtenido
        const productoSeleccionado = productos.find(producto => producto.id === productoId);

        // 4. Inyectar los datos si el producto existe
        if (productoSeleccionado) {
            // Usamos las nuevas propiedades: name, desc, price, img
            document.querySelector('.titulo-producto').textContent = productoSeleccionado.name;
            document.querySelector('.descripcion-producto').textContent = productoSeleccionado.desc;
            document.querySelector('.precio-producto').textContent = `$${productoSeleccionado.price.toLocaleString('es-AR')}`;
            
            const imagenElemento = document.querySelector('.product-image');
            // Aseguramos que la ruta de la imagen parta desde la raíz
            imagenElemento.src = `./${productoSeleccionado.img}`;
            imagenElemento.alt = productoSeleccionado.name;

            // 5. Renderizar los specs dinámicamente
            const listaDetalles = document.querySelector('.detalles-producto');
            listaDetalles.innerHTML = ''; 
            
            // Object.entries() convierte el objeto 'specs' en pares de [título, valor]
            for (const [titulo, valor] of Object.entries(productoSeleccionado.specs)) {
                const li = document.createElement('li');
                li.innerHTML = `<span class="detalle-titulo">${titulo}</span><span class="detalle-valor">${valor}</span>`;
                listaDetalles.appendChild(li);
            }
        } else {
            document.querySelector('.contenedor-producto').innerHTML = '<h2 style="text-align:center; width:100%; color:#A0522D;">Producto no encontrado</h2>';
        }
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
    }
});
*/
// Apuntamos a la clase de tu contenedor original para no perder los estilos base
const contenedorProducto = document.querySelector(".contenedor-producto");

function obtenerIdDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function obtenerProductos() {
  const respuesta = await fetch("./db/products.json");
  if (!respuesta.ok) {
    throw new Error(`No se pudieron cargar los productos: ${respuesta.status}`);
  }
  return await respuesta.json();
}

function buscarProductoPorId(productos, id) {
  return productos.find((p) => String(p.id) === String(id));
}

// MAGIA APLICADA: Mantenemos tu diseño tabular (los <span> en lugar de <strong>)
function renderizarSpecs(producto) {
  if (!producto.specs || typeof producto.specs !== "object") return "";

  const filas = Object.entries(producto.specs)
    .filter(([, valor]) => valor !== undefined && valor !== null && valor !== "")
    .map(([etiqueta, valor]) => `<li><span class="detalle-titulo">${etiqueta}</span><span class="detalle-valor">${valor}</span></li>`)
    .join("");

  if (!filas) return "";

  // Retornamos la lista limpia con tu clase CSS, eliminando los "info-box" de tu compañero que rompen el diseño
  return `<ul class="detalles-producto">${filas}</ul>`;
}

// Inyectamos las secciones exactas de tu diseño anterior
function renderizarProducto(producto) {
  if (!contenedorProducto) return;

  contenedorProducto.innerHTML = `
    <section class="seccion-imagen">
      <img src="./${producto.img}" alt="${producto.name}" class="product-image">
    </section>
    <section class="seccion-informacion">
      <h1 class="titulo-producto">${producto.name}</h1>
      <p class="descripcion-producto">${producto.desc || "Producto artesanal de Hermanos Jota."}</p>

      ${renderizarSpecs(producto)}

      <div class="contenedor-precio">
        <span class="precio-producto">$${producto.price.toLocaleString("es-AR")}</span>
      </div>
      <button class="btn-agregar-carrito" data-id="${producto.id}" type="button">
        Añadir al Carrito
      </button>
    </section>
  `;

  escucharBotonAgregar();
}

function escucharBotonAgregar() {
  const boton = document.querySelector(".btn-agregar-carrito");
  if (!boton) return;

  boton.addEventListener("click", () => {
    // Validamos que la función del grupo exista antes de ejecutarla para evitar errores
    if (typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(boton.dataset.id);
    }
  });
}

function renderizarError(mensaje) {
  if (!contenedorProducto) return;
  // Mensaje de error personalizado respetando la paleta de colores oficial de la marca
  contenedorProducto.innerHTML = `
    <div style="text-align:center; width:100%; padding: 3rem;">
      <h2 style="color: #A0522D; margin-bottom: 1rem;">Oops!</h2>
      <p style="color: #333333; font-family: 'Inter', sans-serif;">${mensaje}</p>
      <a href="productos.html" style="display:inline-block; margin-top:1rem; color: #D4A437; text-decoration: underline;">Volver al catálogo</a>
    </div>
  `;
}

async function iniciarDetalle() {
  const id = obtenerIdDesdeURL();

  if (!id) {
    renderizarError("No se especificó ningún producto en la URL.");
    return;
  }

  try {
    const productos = await obtenerProductos();
    const producto = buscarProductoPorId(productos, id);

    if (!producto) {
      renderizarError("El producto que buscás no existe o fue removido.");
      return;
    }

    renderizarProducto(producto);
  } catch (error) {
    console.error(error);
    renderizarError("Ocurrió un error al cargar el producto. Intentá nuevamente más tarde.");
  }
}

document.addEventListener("DOMContentLoaded", iniciarDetalle);