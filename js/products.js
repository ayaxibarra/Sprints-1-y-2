//Tomar todos los datos de los productos del archivo JSON
async function fetchProducts(){
    try{
        const response = await fetch('../db/products.json');

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

//Agrega cada elemento del array de objetos como HTML
function renderProducts(productArray){
    const productCatalog = document.getElementById('product-list');

    productCatalog.innerHTML = "";

    productArray.forEach((product) => {
        const li = document.createElement('li');
        li.classList.add('card');

        const article = document.createElement('article');

        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.loading = 'lazy';

        const contentDiv = document.createElement('div');

        const h3 = document.createElement('h3');
        h3.classList.add('card-title');

        const link = document.createElement('a');
        link.href = "";
        link.textContent = product.name;

        const priceDiv = document.createElement('div');

        const priceSpan = document.createElement('span');
        priceSpan.classList.add('card-price');
        priceSpan.textContent = `$ ${product.price}`;

        const button = document.createElement('button');
        button.classList.add('btn-primary');
        button.type = 'button';
        button.dataset.id = product.id;
        button.textContent = 'Añadir al Carrito';

        h3.appendChild(link);
        priceDiv.appendChild(priceSpan);

        contentDiv.appendChild(h3);
        contentDiv.appendChild(priceDiv);
        contentDiv.appendChild(button);

        article.appendChild(img);
        article.appendChild(contentDiv);

        li.appendChild(article);

        productCatalog.appendChild(li);
    });
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