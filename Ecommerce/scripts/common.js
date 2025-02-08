import { cart } from './cart.js';
document.addEventListener('DOMContentLoaded', function () {
    updateYear();

    const badge = document.getElementById('cart-badge');
    badge.innerText = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
});

const updateYear = () => {
    const year = new Date().getFullYear();
    document.getElementById('footer-year').innerText = year;
};

document.getElementById("back-button")?.addEventListener('click', () => {
    window.history.back();
});
document.getElementById("back-to-top-button")?.addEventListener('click', () => {
    window.scrollTo(0, 0);
});
