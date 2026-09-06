/**
 * Módulo compartido del carrito de Hermanos Jota.
 * Persiste los ítems en localStorage y mantiene el contador del header.
 */

const CARRITO_STORAGE_KEY = "hermanosjota_carrito";

/**
 * Lee el carrito guardado. Si no hay datos o están corruptos, devuelve un array vacío.
 * @returns {Array<{id: string|number, cantidad: number}>}
 */
function leerCarrito() {
  try {
    const datos = localStorage.getItem(CARRITO_STORAGE_KEY);

    if (!datos) {
      return [];
    }

    const carrito = JSON.parse(datos);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error("No se pudo leer el carrito:", error.message);
    return [];
  }
}

/**
 * Guarda el carrito en localStorage y actualiza el contador visible.
 * @param {Array<{id: string|number, cantidad: number}>} carrito
 */
function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
  actualizarContadorVisual();
}

/**
 * Suma las cantidades y las muestra en #cart-counter.
 */
function actualizarContadorVisual() {
  const contador = document.querySelector("#cart-counter");

  if (!contador) {
    return;
  }

  const totalUnidades = leerCarrito().reduce((acumulado, item) => {
    const cantidad = Number(item.cantidad) || 0;
    return acumulado + cantidad;
  }, 0);

  contador.textContent = String(totalUnidades);
}

/**
 * Agrega un producto al carrito. Si ya existe, incrementa su cantidad.
 * @param {string|number} id - Identificador del producto.
 */
function agregarAlCarrito(id) {
  const carrito = leerCarrito();
  const itemExistente = carrito.find((item) => String(item.id) === String(id));

  if (itemExistente) {
    itemExistente.cantidad = (Number(itemExistente.cantidad) || 0) + 1;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

document.addEventListener("DOMContentLoaded", actualizarContadorVisual);
