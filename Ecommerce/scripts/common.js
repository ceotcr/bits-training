document.addEventListener('DOMContentLoaded', function () {
    updateYear();

    const badge = document.getElementById('cart-badge');
    badge.innerText = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0;
    if (JSON.parse(localStorage.getItem("user") || "{}").id) {
        document.getElementById("logout").style.display = "block";
        document.getElementById("login").style.display = "none";
    }
    else {
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
    }
    document.getElementById("logout").addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        window.location.href = '/Ecommerce/';
    });
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


document.getElementById("mob-nav-toggler")?.addEventListener('click', () => {
    document.getElementById("mob-nav").classList.toggle("active");
})



export const decode = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
