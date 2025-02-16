import { generateStars } from './products.js';
import { getProduct } from './apis.js';
import { cart } from './cart.js';
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) {
        window.location.href = '/Ecommerce-ts/';
    }
    const product = await getProduct(Number(productId));
    document.querySelector("#title").textContent = product.title;
    document.querySelector("#description").textContent = product.description.charAt(0).toUpperCase() + product.description.slice(1);
    document.querySelector("#price").textContent = `$${product.price}`;
    // first character to uppercase
    document.querySelector("#category").textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.querySelector("#category").href = `/Ecommerce-ts/products/?category=${product.category}`;
    document.querySelector("#image").src = product.image;
    document.querySelector("#image").alt = product.title;
    document.querySelector("#main-product-container").classList.remove('hidden');
    document.querySelector("#loading").classList.add('hidden');
    const elem = generateStars(product.rating.rate, product.rating.count);
    document.querySelector(".add-to-cart").dataset.product = JSON.stringify(product);
    document.querySelector('button.add-to-cart').addEventListener('click', (e) => {
        const button = e.target;
        const product = JSON.parse(button.dataset.product || "{}");
        cart.add(product);
    });
    document.querySelector("#rating").appendChild(elem);
});
