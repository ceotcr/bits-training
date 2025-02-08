import { getProducts, getCategories } from './apis.js';
import { getProductCard } from './products.js';

let products = []
document.addEventListener('DOMContentLoaded', async () => {
    const categories = await getCategories();
    renderCategoriesSelect(categories);
    checkCategoryParam(categories);

    document.getElementById("sort-by-price").addEventListener('change', async (e) => {
        const sortBy = e.target.value;
        if (sortBy === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (sortBy === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        else {
            const categoryFilter = document.getElementById('category-filter').value;
            const category = categoryFilter !== 'all' ? categoryFilter : "";
            products = await getProducts({ category });
        }
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = getProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
    );
});


const checkCategoryParam = async (categories) => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = decodeURIComponent(urlParams.get('category'));
    if (category && categories.includes(category)) {
        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.value = category;
        products = await getProducts({ category });
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = getProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
    else {
        showProducts();
    }
}

const showProducts = async () => {
    products = await getProducts({});
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = getProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

const renderCategoriesSelect = (categories) => {
    const select = document.getElementById('category-filter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
    select.addEventListener('change', async () => {
        const category = select.value !== 'all' ? select.value : "";
        products = await getProducts({ category });
        const priceSort = document.getElementById('sort-by-price').value;
        if (priceSort === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (priceSort === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = getProductCard(product);
            productsContainer.appendChild(productCard);
        });
    });
}