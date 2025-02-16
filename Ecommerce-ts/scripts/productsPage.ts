import { getProducts, getCategories, IProduct } from './apis.js';
import { getProductCard } from './products.js';

let products: IProduct[] = []
document.addEventListener('DOMContentLoaded', async () => {
    const categories = await getCategories();
    renderCategoriesSelect(categories);
    checkCategoryParam(categories);

    (document.getElementById("sort-by-price") as HTMLSelectElement).addEventListener('change', async (e) => {
        const sortBy = (e.target as HTMLSelectElement).value;
        if (sortBy === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (sortBy === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        else {
            const categoryFilter = (document.getElementById('category-filter') as HTMLSelectElement).value;
            const category = categoryFilter !== 'all' ? categoryFilter : "";
            products = await getProducts({ category });
        }
        const productsContainer = document.getElementById('products-container') as HTMLDivElement;
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = getProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
    );
});


const checkCategoryParam = async (categories: string[]) => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = decodeURIComponent(urlParams.get('category') || "");
    if (category && categories.includes(category)) {
        const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
        categoryFilter.value = category;
        products = await getProducts({ category });
        const productsContainer = document.getElementById('products-container') as HTMLDivElement;
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
    const productsContainer = document.getElementById('products-container') as HTMLDivElement;
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = getProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

const renderCategoriesSelect = (categories: string[]) => {
    const select = document.getElementById('category-filter') as HTMLSelectElement;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
    select.addEventListener('change', async () => {
        const category = select.value !== 'all' ? select.value : "";
        products = await getProducts({ category });
        const priceSort = (document.getElementById('sort-by-price') as HTMLSelectElement).value;
        if (priceSort === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (priceSort === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        const productsContainer = document.getElementById('products-container') as HTMLDivElement;
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = getProductCard(product);
            productsContainer.appendChild(productCard);
        });
    });
}