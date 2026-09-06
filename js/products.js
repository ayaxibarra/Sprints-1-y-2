//Tomar todos los datos de los productos del archivo JSON
async function fetchProducts(){
    try{
        const response = await fetch('./db/products.json');

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const products = await response.json();

        return products;
    }
    catch(error){
        console.error("No se pudo obtener los productos", error.message);

        return [];
    }

}

function escucharBotonesAgregar() {
  const botones = document.querySelectorAll(".btn-agregar");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      agregarAlCarrito(boton.dataset.id);
    });
  });
}

//Agrega cada elemento del array de objetos como HTML
function renderProducts(productArray){
    const productCatalog = document.getElementById('product-list');

    productCatalog.innerHTML = "";

    productArray.forEach((product) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <img class= "card-img" src="./${product.img}" alt="${product.name}" loading="lazy">
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-description">${product.desc || "Producto artesanal de Hermanos Jota."}</p>
                <p class="card-price">$${product.price.toLocaleString('es-AR')}</p>
                <div class="card-actions">
                    <button class="btn-primary btn-agregar" type="button" data-id="${product.id}">
                        Añadir al Carrito
                    </button>
                    <a href="producto.html?id=${product.id}" class="btn-secondary">
                        Ver Detalle
                    </a>
                </div>
            </div>
        `;

        productCatalog.appendChild(li);
    });

    escucharBotonesAgregar();
}

//Función para aplicar busqueda y ordenamiento
function applyFilters(productArray) {
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort');

    const search = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedOption = sortSelect ? sortSelect.value : '';

    let filteredProducts = productArray.filter(p => 
        p.name.toLowerCase().includes(search)
    );

    if (selectedOption === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'newest') {
        filteredProducts.sort((a, b) => b.id - a.id);
    }

    renderProducts(filteredProducts);
}

async function init(){
    const products = await fetchProducts();

    //Listener para detectar cambios en el menú desplegable
    const sortSelect = document.getElementById('sort');

    if (sortSelect){
        sortSelect.addEventListener('change', () => applyFilters(products));
    }

    //Listener para boton de busqueda
    const searchSubmit = document.getElementById('search-submit');
    const searchInput = document.getElementById('search-input');

    if (searchSubmit && searchInput) {
        searchSubmit.addEventListener('click', (e) => {
            applyFilters(products)
        });
    }

    applyFilters(products);
}

init();