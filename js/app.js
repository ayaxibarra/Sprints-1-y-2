// Selección de elementos del DOM
const contenedorDestacados = document.querySelector("#productos-destacados");

let carritoCount = 0;

// Carga de productos desde products.json //

async function obtenerProductos() {
  const respuesta = await fetch("./db/products.json");

  if (!respuesta.ok) {
    throw new Error(`No se pudieron cargar los productos: ${respuesta.status}`);
  }

  return await respuesta.json();
}

// Simulación de carga asíncrona de datos mediante Promises y setTimeout
function obtenerProductosSimulados() {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const datos = await obtenerProductos();
        resolve(datos);
      } catch (error) {
        reject(error);
      }
    }, 800); // Simula 800ms de latencia de red
  });
}

// Función para renderizar tarjetas en el DOM
function renderizarProductos(listaProductos) {
  contenedorDestacados.innerHTML = "";

  const destacados = listaProductos.slice(0, 4); // Limita a los primeros 4 productos destacados

  destacados.forEach((producto) => {
    const article = document.createElement("article");
    article.classList.add("card");

  article.innerHTML = `
    <img 
    src="./${producto.img}" 
    alt="${producto.name}" 
    >

    <div class="card-body"> 
      <h3 class="card-title">${producto.name}</h3> 

      <p class="card-description"> 
        ${producto.desc || "Producto artesanal de Hermanos Jota."} 
      </p> 

      <p class="card-price"> $${producto.price.toLocaleString("es-AR")} 
      </p> 

      <div class="card-actions">
        <button 
          class="btn-primary btn-agregar" 
          data-id="${producto.id}" 
        > 
          Añadir al Carrito 
        </button>
        <a 
          href="producto.html?id=${producto.id}" 
          class="btn-secondary">
          Ver Detalle
        </a>
      </div>
    </div> `;

    contenedorDestacados.appendChild(article);
  });

  escucharBotonesAgregar();
}

// Agregar funcionalidad a los botones del carrito//
function escucharBotonesAgregar() {
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      carritoCount++;

      const contador = document.querySelector("#cart-counter");

      if (contador) {
        contador.textContent = carritoCount;
      }
    });
  });
}

// Flujo principal de ejecución asíncrona
async function iniciarApp() {
  contenedorDestacados.innerHTML = "<p>⏳ Cargando piezas destacadas...</p>";

  try {
    const datosProductos = await obtenerProductosSimulados();
    renderizarProductos(datosProductos);
  } catch (error) {
    console.error(error);
  }
}

// Mostrar / Ocultar botón "Volver arriba" al hacer scroll
const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", iniciarApp);
