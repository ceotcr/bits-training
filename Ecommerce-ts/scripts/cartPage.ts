import { cart, handleCartChange } from "./cart.js";
document.addEventListener('DOMContentLoaded', async () => {
    const products = cart.items
    handleCartChange(products)
})
