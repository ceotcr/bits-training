export const cart = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    get total() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    get quantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    add(product) {
        const item = this.items.find(item => item.id === product.id);
        if (item) {
            item.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
    },
    remove(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
    },
    clear() {
        this.items = [];
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
    }
}


export const updateCartBadge = (value) => {
    const badge = document.getElementById('cart-badge');
    badge.innerText = value;
}