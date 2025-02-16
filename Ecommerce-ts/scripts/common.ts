document.addEventListener('DOMContentLoaded', function () {
    updateYear();

    const badge = document.getElementById('cart-badge') as HTMLSpanElement;
    badge.innerText = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || "[]").length : 0;
    const user = localStorage.getItem('user');
    const login = document.getElementById('login') as HTMLAnchorElement;
    const logout = document.getElementById('logout') as HTMLButtonElement;
    const admin = document.getElementById('admin') as HTMLAnchorElement;
    if (user) {
        login.style.display = 'none';
        logout.style.display = 'block';
        admin.style.display = 'flex'
    } else {
        login.style.display = 'block';
        logout.style.display = 'none';
        admin.style.display = 'none'
    }

    logout.addEventListener('click', () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        window.location.href = '/Ecommerce-ts/';
    });
});

const updateYear = () => {
    const year = new Date().getFullYear();
    const footerYear = document.getElementById('footer-year') as HTMLSpanElement;
    footerYear.innerText = `${year}`;
};

document.getElementById("back-button")?.addEventListener('click', () => {
    window.history.back();
});
document.getElementById("back-to-top-button")?.addEventListener('click', () => {
    window.scrollTo(0, 0);
});


document.getElementById("mob-nav-toggler")?.addEventListener('click', () => {
    const mobNav = document.getElementById("mob-nav") as HTMLElement;
    mobNav.classList.toggle("active");
})



export const decode = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
