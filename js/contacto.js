// 1. SELECCIÓN DEL DOM
// ---------------------------------------------------------------------------
const seccionContacto = document.querySelector("#contacto");
const formulario = document.querySelector("#formulario-contacto");
const inputNombre = document.querySelector("#nombreCompleto");
const inputEmail = document.querySelector("#correoElectronico");
const inputMensaje = document.querySelector("#mensajeConsulta");
const botonEnviar = document.querySelector("#btn-enviar");

// Regex estándar de email: algo@dominio.ext (sin espacios).
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mínimo de caracteres para considerar que el mensaje es una consulta real.
const MIN_CARACTERES_MENSAJE = 10;

// Texto original del botón, para restaurarlo después del estado de carga.
const TEXTO_BOTON_DEFAULT = botonEnviar ? botonEnviar.textContent : "Enviar Mensaje";

// 2. ALERTAS VISUALES DE ERROR
// ---------------------------------------------------------------------------

/**
 * @param {HTMLElement} campo - Input o textarea que falló la validación.
 * @param {string} textoError - Mensaje claro para que el usuario sepa qué corregir.
 */
function mostrarError(campo, textoError) {
  campo.classList.add("error-input");
  campo.setAttribute("aria-invalid", "true");

  const grupo = campo.parentElement;
  let spanError = grupo.querySelector(".error-mensaje");

  if (!spanError) {
    spanError = document.createElement("span");
    spanError.className = "error-mensaje";
    campo.insertAdjacentElement("afterend", spanError);
  }

  spanError.textContent = textoError;
}

/**
 * Quita el estado de error de un campo cuando ya cumple las reglas:
 * - Remueve .error-input.
 * - Elimina el <span> de error del DOM si existía.
 * @param {HTMLElement} campo - Input o textarea que ahora es válido.
 */
function limpiarError(campo) {
  campo.classList.remove("error-input");
  campo.removeAttribute("aria-invalid");

  const spanError = campo.parentElement.querySelector(".error-mensaje");
  if (spanError) {
    spanError.remove();
  }
}

// 3. VALIDACIONES ESPECÍFICAS (una función por campo)
// ---------------------------------------------------------------------------

//El nombre no puede quedar vacío ni ser solo espacios.
function validarNombre() {
  const valor = inputNombre.value.trim();

  if (valor === "") {
    mostrarError(inputNombre, "Por favor, ingresá tu nombre completo.");
    return false;
  }

  limpiarError(inputNombre);
  return true;
}

// El email no puede estar vacío y debe coincidir con el formato de correo.

function validarEmail() {
  const valor = inputEmail.value.trim();

  if (valor === "") {
    mostrarError(inputEmail, "Por favor, ingresá tu correo electrónico.");
    return false;
  }

  if (!REGEX_EMAIL.test(valor)) {
    mostrarError(inputEmail, "El formato del correo no es válido. Ejemplo: nombre@correo.com");
    return false;
  }

  limpiarError(inputEmail);
  return true;
}

// El mensaje no puede estar vacío y debe tener al menos 10 caracteres reales.
function validarMensaje() {
  const valor = inputMensaje.value.trim();

  if (valor === "") {
    mostrarError(inputMensaje, "Por favor, escribí tu consulta.");
    return false;
  }

  if (valor.length < MIN_CARACTERES_MENSAJE) {
    mostrarError(
      inputMensaje,
      `El mensaje debe tener al menos ${MIN_CARACTERES_MENSAJE} caracteres.`
    );
    return false;
  }

  limpiarError(inputMensaje);
  return true;
}

/**
 * Recorre los tres campos y dispara todas las validaciones.
 * No usamos "return temprano": queremos marcar TODOS los errores a la vez,
 * para que el usuario no tenga que enviar el form tres veces.
 * @returns {boolean} true solo si nombre, email y mensaje son válidos.
 */
function validarFormulario() {
  const nombreOk = validarNombre();
  const emailOk = validarEmail();
  const mensajeOk = validarMensaje();

  return nombreOk && emailOk && mensajeOk;
}

// 4. MENSAJE DE ÉXITO (tarjeta insertada dinámicamente)
// ---------------------------------------------------------------------------
function borrarMensajeExitoAnterior() {
  const previo = seccionContacto.querySelector(".mensaje-exito");
  if (previo) {
    previo.remove();
  }
}

function mostrarMensajeExito() {
  borrarMensajeExitoAnterior();

  const tarjeta = document.createElement("div");
  tarjeta.className = "mensaje-exito";
  tarjeta.setAttribute("role", "status");
  tarjeta.setAttribute("aria-live", "polite");

  const titulo = document.createElement("h3");
  titulo.textContent = "Consulta enviada";

  const parrafo = document.createElement("p");
  parrafo.textContent = "¡Gracias por escribirnos! Tu consulta fue recibida.";

  tarjeta.appendChild(titulo);
  tarjeta.appendChild(parrafo);

  seccionContacto.insertBefore(tarjeta, formulario);

  tarjeta.scrollIntoView({ behavior: "smooth", block: "center" });
}

// 5. SIMULACIÓN DE ENVÍO (carga de 1 segundo)
// ---------------------------------------------------------------------------
// Activa el estado de carga del botón: se deshabilita para evitar dobles clics y cambia el texto para dar feedback inmediato.
function activarEstadoCarga() {
  botonEnviar.disabled = true;
  botonEnviar.classList.add("cargando");
  botonEnviar.textContent = "Enviando...";
}

// Restaura el botón a su estado original después de la simulación.
function desactivarEstadoCarga() {
  botonEnviar.disabled = false;
  botonEnviar.classList.remove("cargando");
  botonEnviar.textContent = TEXTO_BOTON_DEFAULT;
}

function simularEnvio() {
  activarEstadoCarga();

  setTimeout(() => {
    mostrarMensajeExito();
    formulario.reset();
    limpiarError(inputNombre);
    limpiarError(inputEmail);
    limpiarError(inputMensaje);
    desactivarEstadoCarga();
  }, 1000);
}

// 6. EVENTOS
// ---------------------------------------------------------------------------
function alEnviarFormulario(evento) {
  evento.preventDefault();

  const formularioEsValido = validarFormulario();

  if (!formularioEsValido) {
    const primerError = formulario.querySelector(".error-input");
    if (primerError) {
      primerError.focus();
    }
    return;
  }

  simularEnvio();
}

function escucharValidacionEnTiempoReal() {
  const camposConValidador = [
    { campo: inputNombre, validar: validarNombre },
    { campo: inputEmail, validar: validarEmail },
    { campo: inputMensaje, validar: validarMensaje }
  ];

  camposConValidador.forEach(({ campo, validar }) => {
    campo.addEventListener("input", () => {
      const yaTeniaError = campo.classList.contains("error-input");
      const escribioAlgo = campo.value.trim() !== "";

      if (yaTeniaError || escribioAlgo) {
        validar();
      }
    });
  });
}

function iniciarContacto() {
  if (!formulario) {
    return;
  }

  formulario.addEventListener("submit", alEnviarFormulario);
  escucharValidacionEnTiempoReal();
}

document.addEventListener("DOMContentLoaded", iniciarContacto);