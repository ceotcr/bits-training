import { getProducts, getCategories } from './apis.js';
import { showSnackbar } from './cart.js';
import { getProductCard } from './products.js';
let products = [];
document.addEventListener('DOMContentLoaded', async () => {
    const categories = await getCategories();
    renderCategoriesSelect(categories);
    const initialProducts = await getProducts({});
    showProducts(initialProducts);
    const sortSelect = document.getElementById("sort-by-price");
    sortSelect.addEventListener('change', async (e) => {
        const target = e.target;
        const sortBy = target.value;
        if (sortBy === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (sortBy === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        else {
            const catSelect = document.getElementById('category-filter');
            const categoryFilter = catSelect.value;
            const category = categoryFilter !== 'all' ? categoryFilter : "";
            products = await getProducts({ category });
        }
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';
        showProducts(products);
    });
    const categorySelect = document.getElementById("form-category");
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    const modal = document.getElementById("modal");
    const addProductButton = document.getElementById("add-product");
    addProductButton.addEventListener('click', () => {
        modal.classList.remove("hidden");
        const form = document.getElementById("add-product-form");
        form.addEventListener('submit', handleFormSubmit);
        const modalClose = document.getElementById("close-modal");
        modalClose.addEventListener('click', () => {
            modal.classList.add("hidden");
        });
    });
});
const showProducts = async (products) => {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const updatedProductCard = getProductWithButtons(product);
        productsContainer.appendChild(updatedProductCard);
    });
};
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
        showProducts(products);
    });
};
const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const product = {
        title: "",
        price: 0,
        description: "",
        image: "",
        id: -1,
        category: "",
        rating: { rate: 0, count: 0 }
    };
    formData.forEach((value, key) => {
        if (key in product) {
            product[key] = value;
        }
    });
    const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify(product)
    });
    const json = await response.json();
    if (json.id) {
        products.push(json);
        const productsContainer = document.getElementById('products-container');
        const updatedProductCard = getProductWithButtons({ ...product, id: json.id });
        productsContainer.insertBefore(updatedProductCard, productsContainer.firstChild);
        const modal = document.getElementById("modal");
        modal.classList.add("hidden");
        showSnackbar('Product added successfully', 'success');
    }
    else {
        showSnackbar('Failed to add product', 'error');
    }
    form.reset();
};
const getProductWithButtons = (product) => {
    const productCard = getProductCard(product);
    const deleteButton = document.createElement('button');
    const productsContainer = document.getElementById('products-container');
    deleteButton.className = 'p-2 cursor-pointer bg-red-500 text-white rounded-md material-symbols-outlined';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            products = products.filter(p => p.id !== product.id);
            productsContainer.removeChild(productCard);
            showSnackbar('Product deleted successfully', 'success');
        }
        else {
            showSnackbar('Failed to delete product', 'error');
        }
    });
    const editButton = document.createElement('button');
    editButton.className = 'p-2 cursor-pointer bg-blue-500 text-white rounded-md material-symbols-outlined';
    editButton.textContent = 'Edit';
    const modal = document.getElementById("modal");
    editButton.addEventListener('click', async () => {
        const form = document.getElementById("add-product-form");
        form.querySelector('.form-heading').textContent = 'Edit Product';
        form.querySelector('[name="title"]').value = product.title;
        form.querySelector('[name="price"]').value = product.price.toString();
        form.querySelector('[name="description"]').value = product.description;
        form.querySelector('[name="image"]').value = product.image;
        modal.classList.remove("hidden");
        document.getElementById("close-modal").addEventListener('click', () => {
            modal.classList.add("hidden");
        });
        form.removeEventListener('submit', handleFormSubmit);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const updatedProduct = {};
            formData.forEach((value, key) => {
                updatedProduct[key] = value;
            });
            const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedProduct)
            });
            const json = await response.json(); //only has id
            if (json.id) {
                products = products.map(p => p.id === product.id ? { ...product, ...updatedProduct, id: json.id } : p);
                productCard.querySelector('img').src = updatedProduct.image;
                productCard.querySelector('h3').textContent = updatedProduct.title;
                productCard.querySelector('p').textContent = `$${updatedProduct.price}`;
                showSnackbar('Product updated successfully', 'success');
            }
            else {
                showSnackbar('Failed to update product', 'error');
            }
            form.querySelector('.form-heading').textContent = 'Add Product';
            form.reset();
            modal.classList.add("hidden");
        });
    });
    productCard.querySelector(".details").appendChild(editButton);
    productCard.querySelector(".details").appendChild(deleteButton);
    return productCard;
};
