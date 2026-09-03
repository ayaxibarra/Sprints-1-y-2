//Array de objetos de los productos
let products = [
    {
        id:0,
        name:"Aparador Uspallata",
        desc:"",
        price:2000,
        img:"img/Aparador Uspallata.png"
    },
    {
        id:1,
        name:"Biblioteca Recoleta",
        desc:"",
        price:3000,
        img:"img/Biblioteca Recoleta.png"
    },
    {
        id:2,
        name:"Butaca Mendoza",
        desc:"",
        price:1500,
        img:"img/Butaca Mendoza.png"
    },
    {
        id:3,
        name:"Escritorio Costa",
        desc:"",
        price:4000,
        img:"img/Escritorio Costa.png"
    },
    {
        id:4,
        name:"Mesa Comedor Pampa",
        desc:"",
        price:3000,
        img:"img/Mesa Comedor Pampa.png"
    },
    {
        id:5,
        name:"Mesa de Centro Araucaria",
        desc:"",
        price:2500,
        img:"img/Mesa de Centro Araucaria.png"
    },
    {
        id:6,
        name:"Mesa de Noche Aconcagua",
        desc:"",
        price:4500,
        img:"img/Mesa de Noche Aconcagua.png"
    },
    {
        id:7,
        name:"Silla de Trabajo Belgrano",
        desc:"",
        price:1000,
        img:"img/Silla de Trabajo Belgrano.png"
    },
    {
        id:8,
        name:"Sillas Córdoba",
        desc:"",
        price:1100,
        img:"img/Sillas Córdoba.png"
    },
    {
        id:9,
        name:"Sillón Copacabana",
        desc:"",
        price:1200,
        img:"img/Sillón Copacabana.png"
    },
    {
        id:10,
        name:"Sofá Patagonia",
        desc:"",
        price:5500,
        img:"img/Sofá Patagonia.png"
    }
]

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

// Función para ordenar y actualizar la lista
function sortProducts() {
    const sortSelect = document.getElementById('sort');
    const selectedOption = sortSelect.value;

    let sortedProducts = [...products];

    if (selectedOption === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedOption === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === 'newest') {
        sortedProducts.sort((a, b) => b.id - a.id);
    }

    renderProducts(sortedProducts);
}

// Listener para detectar cambios en el menú desplegable
const sortSelect = document.getElementById('sort');
if (sortSelect) {
    sortSelect.addEventListener('change', sortProducts);
}

sortProducts();