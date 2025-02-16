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
    (document.querySelector("#title") as HTMLElement).textContent = product.title;
    (document.querySelector("#description") as HTMLElement).textContent = product.description.charAt(0).toUpperCase() + product.description.slice(1);
    (document.querySelector("#price") as HTMLElement).textContent = `$${product.price}`;
    // first character to uppercase
    (document.querySelector("#category") as HTMLElement).textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    (document.querySelector("#category") as HTMLAnchorElement).href = `/Ecommerce-ts/products/?category=${product.category}`;
    (document.querySelector("#image") as HTMLImageElement).src = product.image;
    (document.querySelector("#image") as HTMLImageElement).alt = product.title;
    (document.querySelector("#main-product-container") as HTMLElement).classList.remove('hidden');
    (document.querySelector("#loading") as HTMLElement).classList.add('hidden');
    const elem = generateStars(
        product.rating.rate,
        product.rating.count
    );
    (document.querySelector(".add-to-cart") as HTMLElement).dataset.product = JSON.stringify(product);

    (document.querySelector('button.add-to-cart') as HTMLButtonElement).addEventListener('click', (e) => {
        const button = e.target as HTMLButtonElement;
        const product = JSON.parse(button.dataset.product || "{}");
        cart.add(product);
    });

    (document.querySelector("#rating") as HTMLElement).appendChild(elem);
});