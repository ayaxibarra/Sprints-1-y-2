# E-commerce: Mueblería Hermanos Jota

Proyecto desarrollado para el sprint de Frontend (HTML, CSS y JavaScript). Sitio web responsivo de comercio electrónico simulado para una mueblería local.

## Descripción del Proyecto

Este proyecto corresponde a la primera fase de desarrollo de un sitio web de e-commerce para Mueblería Hermanos Jota, un taller familiar dedicado a la fabricación de muebles artesanales por más de 6 décadas.

Durante esta fase se desarrolló la interfaz completa del sitio web junto con las funcionalidades necesarias para brindar una experiencia interactiva al usuario. La implementación se realizó exclusivamente mediante tecnologías del lado del cliente (HTML, CSS y JavaScript), sin utilizar un backend real. Los datos de los productos se almacenan localmente en un archivo JSON y se simula su carga asíncrona utilizando `fetch`, `Promise` y `setTimeout`.

El sitio permite al usuario:

- Explorar el catálogo completo de productos, con búsqueda y ordenamiento de precio por mayor/menor o los muebles más recientes.
- Visualizar el detalle de cada producto (nombre, descripción, especificaciones técnicas y precio).
- Añadir productos a un carrito con contador persistente entre páginas (localStorage).
- Contactar a la mueblería mediante un formulario del lado del cliente, con feedback visual de éxito y errores.

## Integrantes del Equipo
- Ayax Franklin Ibarra Ruveda - Estilos base, Header, Footer y Estructura Global.
- Franco Gabriel Gil - Página de Inicio, Hero Banner, Productos Destacados, Renderización JavaScript. 
- Daiana Rosario Pereyra Stanicio - Página de contacto y Estilo de Formulario Accesible.
- Franco Agustín Perez Lepera - Página de productos, Carga y renderizado de productos.
- Micaela Abril Pérez - Página de detalle de producto, Diseño visual y Renderizado JavaScript.

## Tecnologías Utilizadas
- HTML5 Semántico
- CSS3 (Flexbox, Mobile-First)
- JavaScript - DOM, Arrays de objetos, Asincronía (fetch, Promise, async/await), localStorage
- Git & GitHub - control de versiones y colaboración del grupo en distintas ramas.

## Recorrido por el sitio

| Página | Archivo | Qué encontrás ahí |
|---|---|---|
| Inicio | `index.html` | Hero Banner, Productos Destacados (los primeros 4 del catálogo), sección "Nuestros Compromisos" (garantía, restauración, trazabilidad) y Opiniones de Clientes. |
| Catálogo | `productos.html` | Todos los productos en grilla, con búsqueda por nombre y ordenamiento por precio o antigüedad. |
| Detalle de Producto | `producto.html` | Vista ampliada de un producto puntual, resuelta a partir del `id` en la URL (`producto.html?id=3`). |
| Contacto | `contacto.html` | Formulario con validación en tiempo real y confirmación visual al enviar. |

Header, footer y el botón "volver arriba" son compartidos por las 4 páginas, para mantener una experiencia de navegación consistente en todo el sitio.

## Por dentro: cómo se mueven los datos

**El catálogo vive en un solo lugar.** Todos los productos están en `db/products.json` — nombre, precio, imagen, descripción y un objeto `specs` con las características propias de cada mueble (medidas, materiales, acabado, y lo que corresponda: un sillón tiene "Tapizado", una mesa tiene "Extensión"). Como `specs` es flexible, cada producto puede tener campos completamente distintos sin tocar el código de `detalle.js` — el mismo template arma la lista de especificaciones sin importar qué claves traiga.

**La carga se simula, no es instantánea.** Tanto Inicio como Catálogo esperan un `Promise` con `setTimeout` antes de mostrar los productos, imitando la latencia de una API real, en vez de renderizar todo de una.

**El carrito no vive en memoria, vive en `localStorage`.** Agregar un producto desde cualquier página guarda el cambio en el navegador; al entrar a otra página (o volver más tarde), el contador del header refleja el mismo total. Esto está centralizado en `carrito.js`, incluido en las 4 páginas — así ningún script individual maneja su propia copia del carrito.

**La accesibilidad no es un agregado al final.** El formulario de Contacto vincula cada mensaje de error a su campo con `aria-describedby` y `role="alert"`, y las secciones que cambian dinámicamente (productos cargando, errores de Detalle) usan `aria-live` para que un lector de pantalla las anuncie sin que el usuario tenga que buscarlas.

**Mobile-first de punta a punta.** El CSS se escribió primero para pantallas chicas y se adapta a escritorio con media queries — no al revés.

## Estructura del Proyecto

```
├── index.html
├── productos.html
├── producto.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js          # Lógica de Inicio (Hero + Destacados)
│   ├── products.js     # Lógica del Catálogo
│   ├── detalle.js       # Lógica del Detalle de Producto
│   ├── contacto.js      # Validación del formulario de Contacto
│   ├── carrito.js       # Módulo de carrito compartido (localStorage)
│   └── global.js        # Comportamientos globales (botón "volver arriba")
├── db/
│   └── products.json    # Catálogo de productos
└── img/
    └── ...               # Imágenes de productos y logo
```

## Cómo clonar y ejecutar el proyecto localmente

Este proyecto usa `fetch()` para cargar el catálogo de productos desde un archivo JSON local. Por eso, **no alcanza con abrir `index.html` haciendo doble clic** — los navegadores bloquean ese tipo de solicitud por política de seguridad (CORS) cuando se accede a un archivo directamente desde el disco (`file://`). Es necesario levantar un servidor local, por cualquiera de estas vías:

### 1. Clonar el repositorio

```bash
git clone https://github.com/ayaxibarra/Sprints-1-y-2.git
cd Sprints-1-y-2
```

### 2. Levantar un servidor local (elegir una opción)

**Opción A — Visual Studio Code + Live Server (recomendado)**
1. Instalar la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code.
2. Abrir la carpeta del proyecto en VS Code.
3. Click derecho sobre `index.html` → **"Open with Live Server"**.

**Opción B — Node.js**
```bash
npx http-server
```
Y abrir la URL que indique en la terminal (por defecto `http://127.0.0.1:8080`).

**Opción C — Python**
```bash
python3 -m http.server 5500
```
Y abrir `http://localhost:5500` en el navegador.

### 3. Navegar el sitio
Una vez levantado el servidor, entrar a `index.html` desde la URL local — desde ahí se puede navegar libremente por Catálogo, Detalle de Producto y Contacto usando el menú de navegación.

## Enlaces

- **Repositorio GitHub**: [github.com/ayaxibarra/Sprints-1-y-2](https://github.com/ayaxibarra/Sprints-1-y-2/tree/main)
- **Sitio Web Desplegado**: _(pendiente — se publicará mediante GitHub Pages)_
