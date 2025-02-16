import { getCategories, IProduct, getProducts } from './apis.js';
import { getProductCard } from './products.js';

document.addEventListener('DOMContentLoaded', async function () {
    renderCategories()
    showProducts()
});

const renderCategories = async () => {
    const catCont = document.getElementById("categories") as HTMLDivElement;
    const cats = (await getCategories()).reverse() as (keyof typeof catImages)[];
    catCont.innerHTML = ''
    cats.forEach((cat) => {
        const catItem: HTMLAnchorElement = document.createElement('a');
        catItem.href = `./products/?category=${cat}`;
        catItem.className = 'p-8 flex flex-col ring-1 ring-gray-900/10 text-3xl whitespace-nowrap  hover:ring-gray-900/20 transition duration-300 min-h-[120px] ease-in-out bg-cover bg-center text-center items-center justify-center bg-no-repeat text-white';
        catItem.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${catImages[cat]})`;
        catItem.textContent = cat.slice(0, 1).toUpperCase() + cat.slice(1);
        catCont.appendChild(catItem);
    });
}

const showProducts = async () => {
    const featuredCont = document.getElementById("featured-products") as HTMLDivElement;
    const products: IProduct[] = await getProducts({ limit: 4 });
    featuredCont.innerHTML = ''
    products.forEach(product => {
        featuredCont.appendChild(getProductCard(product))
    });

}

const catImages = {
    "electronics": "./assets/categories/electronic.jpg",
    "jewelery": "./assets/categories/jewelery.jpg",
    "women's clothing": "./assets/categories/women.jpg",
    "men's clothing": "./assets/categories/men.jpg"
}