import { getProducts, getCategories, IProduct } from './apis.js';
import { showSnackbar } from './cart.js';
import { getProductCard } from './products.js';

let products: IProduct[] = []
document.addEventListener('DOMContentLoaded', async () => {
    const categories = await getCategories();
    renderCategoriesSelect(categories);
    const initialProducts = await getProducts({});
    showProducts(initialProducts);
    const sortSelect = document.getElementById("sort-by-price") as HTMLSelectElement;
    sortSelect.addEventListener('change', async (e) => {
        const target = e.target as HTMLSelectElement;
        const sortBy = target.value;
        if (sortBy === 'asc') {
            products.sort((a, b) => a.price - b.price);
        }
        else if (sortBy === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }
        else {
            const catSelect = document.getElementById('category-filter') as HTMLSelectElement;
            const categoryFilter = catSelect.value;
            const category = categoryFilter !== 'all' ? categoryFilter : "";
            products = await getProducts({ category });
        }
        const productsContainer = document.getElementById('products-container') as HTMLDivElement;
        productsContainer.innerHTML = '';
        showProducts(products);
    }
    );
    const categorySelect = document.getElementById("form-category") as HTMLSelectElement;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    const modal = document.getElementById("modal") as HTMLDivElement;
    const addProductButton = document.getElementById("add-product") as HTMLButtonElement;
    addProductButton.addEventListener('click', () => {
        modal.classList.remove("hidden");
        const form = document.getElementById("add-product-form") as HTMLFormElement;
        form.addEventListener('submit', handleFormSubmit)
        const modalClose = document.getElementById("close-modal") as HTMLButtonElement;
        modalClose.addEventListener('click', () => {
            modal.classList.add("hidden");
        });
    });
});


const showProducts = async (products: IProduct[]) => {
    const productsContainer = document.getElementById('products-container') as HTMLDivElement;
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const updatedProductCard = getProductWithButtons(product);
        productsContainer.appendChild(updatedProductCard);
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
        showProducts(products);
    });
}


const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const product: IProduct = {
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
            (product as any)[key] = value;
        }
    });
    const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        body: JSON.stringify(product)
    });
    const json = await response.json();
    if (json.id) {
        products.push(json);
        const productsContainer = document.getElementById('products-container') as HTMLDivElement;
        const updatedProductCard = getProductWithButtons(
            { ...product, id: json.id }
        );
        productsContainer.insertBefore(updatedProductCard, productsContainer.firstChild);
        const modal = document.getElementById("modal") as HTMLDivElement;
        modal.classList.add("hidden");
        showSnackbar('Product added successfully', 'success');
    }
    else {
        showSnackbar('Failed to add product', 'error');
    }
    (form as HTMLFormElement).reset();
}


const getProductWithButtons = (product: IProduct) => {
    const productCard = getProductCard(product);
    const deleteButton = document.createElement('button');
    const productsContainer = document.getElementById('products-container') as HTMLDivElement;
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
    const modal = document.getElementById("modal") as HTMLDivElement;
    editButton.addEventListener('click', async () => {
        const form = document.getElementById("add-product-form") as HTMLFormElement;
        (form.querySelector('.form-heading') as HTMLElement).textContent = 'Edit Product';
        (form.querySelector('[name="title"]') as HTMLInputElement).value = product.title;
        (form.querySelector('[name="price"]') as HTMLInputElement).value = product.price.toString();
        (form.querySelector('[name="description"]') as HTMLTextAreaElement).value = product.description;
        (form.querySelector('[name="image"]') as HTMLInputElement).value = product.image;
        modal.classList.remove("hidden");
        (document.getElementById("close-modal") as HTMLButtonElement).addEventListener('click', () => {
            modal.classList.add("hidden");
        });
        form.removeEventListener('submit', handleFormSubmit);
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const updatedProduct: Record<string, any> = {};
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
                (productCard.querySelector('img') as HTMLImageElement).src = updatedProduct.image;
                (productCard.querySelector('h3') as HTMLElement).textContent = updatedProduct.title;
                (productCard.querySelector('p') as HTMLElement).textContent = `$${updatedProduct.price}`;
                showSnackbar('Product updated successfully', 'success');
            }
            else {
                showSnackbar('Failed to update product', 'error');
            }
            (form.querySelector('.form-heading') as HTMLElement).textContent = 'Add Product';
            form.reset();
            modal.classList.add("hidden");
        });
    });
    (productCard.querySelector(".details") as HTMLElement).appendChild(editButton);
    (productCard.querySelector(".details") as HTMLElement).appendChild(deleteButton);
    return productCard;
}