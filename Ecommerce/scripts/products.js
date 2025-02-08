import { cart } from './cart.js';
export const getProductCard = (product) => {
    const productItem = document.createElement('div');
    productItem.className = 'group relative overflow-hidden';
    const link = document.createElement('a');
    link.href = `/Ecommerce/product/?id=${product.id}`;
    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.className = 'aspect-square w-full transition-transform group-hover:scale-105 rounded-md bg-gray-200 object-cover object-top lg:aspect-auto lg:h-80';
    link.appendChild(image);
    productItem.appendChild(link);
    const details = document.createElement('div');
    details.className = 'mt-4 flex gap-4 justify-between';
    const productDetails = document.createElement('a');
    productDetails.href = `/Ecommerce/product/?id=${product.id}`;
    productDetails.className = 'flex flex-col justify-start text-left items-start w-fit max-w-6/10';
    const title = document.createElement('h3');
    title.className = 'text-lg line-clamp-1 font-medium text-gray-900 group-hover:text-gray-800';
    title.textContent = product.title;
    const price = document.createElement('p');
    price.className = 'text-sm font-medium text-gray-900';
    price.textContent = `$${product.price}`;
    productDetails.appendChild(title);
    productDetails.appendChild(price);
    details.appendChild(productDetails);
    const button = document.createElement('button');
    button.className = 'p-4 w-4-10 rounded-md cursor-pointer add-to-cart';
    button.dataset.product = JSON.stringify(product);
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = 'Add to cart';
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined text-4xl';
    icon.textContent = 'shopping_bag';
    button.appendChild(span);
    button.appendChild(icon);
    button.addEventListener('click', (e) => {
        const buttonElement = e.target.closest('button.add-to-cart'); // Ensure the button is targeted
        if (!buttonElement) return;

        const productData = buttonElement.dataset.product;
        if (!productData) return;

        try {
            const product = JSON.parse(productData);
            cart.add(product);
        } catch (error) {
            console.error("Invalid product data:", productData);
        }
    });
    details.appendChild(button);
    productItem.appendChild(details);
    return productItem;
}


export const generateStars = (rating, count) => {
    const stars = document.createElement('div');
    stars.className = 'flex items-center gap-1';
    const fullStars = Math.floor(rating);
    const lastStarPercentage = (rating - fullStars) * 100;

    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.style.width = '1.5rem';
        star.style.height = '1.5rem';
        star.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        if (i < fullStars) {
            star.style.backgroundColor = '#FCC509';
        } else if (i === fullStars && lastStarPercentage > 0) {
            star.style.background = `linear-gradient(90deg, #FCC509 ${lastStarPercentage}%, #D1D5DB ${lastStarPercentage}%)`;
        }
        else {
            star.style.backgroundColor = '#D1D5DB';
        }
        stars.appendChild(star);
    }

    const ratingText = document.createElement('span');
    ratingText.className = 'text-lg';
    ratingText.textContent = ` ${rating} (${count})`;
    stars.appendChild(ratingText);
    return stars;
}