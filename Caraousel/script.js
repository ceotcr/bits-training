document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('#carousel-container');
    const images = carouselContainer.querySelectorAll('img');
    const totalImages = images.length;
    const imageCount = document.querySelector('#image-count');

    let index = 0;
    const interval = setInterval(() => {
        imageCount.textContent = `${index + 1}/${totalImages}`;
        carouselContainer.style.setProperty('--slide-by', index);
        index = (index + 1) % totalImages;
    }, 2000);

    const prevBt = document.querySelector('#prev');
    const nextBt = document.querySelector('#next');

    prevBt.addEventListener('click', () => {
        imageCount.textContent = `${index + 1}/${totalImages}`;
        clearInterval(interval);
        index = (index - 1 + totalImages) % totalImages;
        carouselContainer.style.setProperty('--slide-by', index);
    });

    nextBt.addEventListener('click', () => {
        imageCount.textContent = `${index + 1}/${totalImages}`;
        clearInterval(interval);
        index = (index + 1) % totalImages;
        carouselContainer.style.setProperty('--slide-by', index);
    });

});