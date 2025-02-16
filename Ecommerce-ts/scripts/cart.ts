import { IProduct } from "./apis";

export const cart: ICart = {
    items: JSON.parse(localStorage.getItem('cart') || "[]") || [],
    cartId: JSON.parse(localStorage.getItem('cartid') || "[]") || null,
    tax: 18,
    get quantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },
    getTotal() {
        return ({
            subtotal: (this.items.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2),
            tax: (this.tax * this.items.reduce((total, item) => total + item.price * item.quantity, 0) / 100).toFixed(2),
            total: (this.items.reduce((total, item) => total + item.price * item.quantity, 0) * (1 + this.tax / 100)).toFixed(2)
        })
    },
    add(product) {
        let user = localStorage.getItem('user');
        let userId = null;

        try {
            userId = user ? JSON.parse(user).id : null;
        } catch (error) {
            console.error("Invalid user data in localStorage:", error);
        }

        if (!userId) {
            showSnackbar("Please login to add products to cart", "warning")
            setTimeout(() => {
                window.location.href = '/Ecommerce-ts/login/';
            }, 2000);
            return
        }
        const item = this.items.find(item => item.id === product.id);
        if (item) {
            item.quantity++;
            showSnackbar("Product quantity increased")
        } else {
            this.items.push({ ...product, quantity: 1 });
            showSnackbar("Product added to cart")
        }
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
        handleCartChange(this.items)
    },
    dec(product) {
        const item = this.items.find(item => item.id === product.id);
        if (!item) return
        if (item.quantity > 1) {
            item.quantity--;
        }
        else {
            this.remove(product.id);
            return
        }
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
        handleCartChange(this.items)
        showSnackbar("Product quantity decreased")

    },
    remove(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
        handleCartChange(this.items)
        showSnackbar("Product removed from cart")
    },
    checkout() {
        this.items = [];
        this.clear();
    },
    clear() {
        this.items = [];
        localStorage.setItem('cart', JSON.stringify(this.items));
        updateCartBadge(this.items.length);
        handleCartChange(this.items)
    },
}

export const updateCartBadge = (value: number) => {
    const badge = document.getElementById('cart-badge') as HTMLSpanElement;
    badge.innerText = `${value}`;
}

export const handleCartChange = (products: ICartItem[]) => {
    if (window.location.pathname === '/Ecommerce-ts/cart/') {
        const cartCont = document.querySelector("#cart-items") as HTMLDivElement
        cartCont.innerHTML = ""
        if (products.length === 0) {
            cartCont.innerHTML = `<h1 class="text-2xl text-center text-gray-500">Your cart is empty</h1> <a href="../products" class="text-xl text-center text-white bg-black p-4">Continue shopping</a>`
        }
        products.forEach(product => {
            const item = document.createElement("div")
            item.classList.add("flex", "gap-4", "w-full")
            item.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-28 aspect-square object-top h-full object-cover rounded-md max-h-28">
            <div class="w-full flex flex-col h-fit">
                <a href="Ecommerce/product/?id=${product.id}" class="text-xl font-semibold text-gray-900">${product.title}</a>
                <a href="Ecommerce/products/?category=${product.category}" class="text-lg font-medium text-gray-500">${product.category}</a>
                <div class="flex items-center gap-4 md:w-fit h-fit">
                    <div class="flex items-center gap-4 mt-2 max-md:justify-between w-full data-holder">
                        <button class="dec-cart-btn text-white material-symbols-outlined text-xl p-2 bg-black cursor-pointer hover:opacity-100 opacity-80 transition-colors disabled:opacity-50">remove</button>
                        <span class="quantity-cart text-lg font-semibold text-gray-900">${product.quantity}</span>
                        <button class="inc-cart-btn text-white material-symbols-outlined text-xl p-2 bg-black cursor-pointer hover:opacity-100 opacity-80 transition-colors disabled:opacity-50">add</button>
                        <button class="remove-cart-btn text-white max-md:ml-auto material-symbols-outlined text-xl p-2 bg-black cursor-pointer hover:opacity-100 opacity-80 transition-colors disabled:opacity-50">close</button>
                    </div>
                </div>
            </div>
        `
            cartCont.appendChild(item)
            const dataHolder = item.querySelector(".data-holder") as HTMLElement
            dataHolder.dataset.product = JSON.stringify(product)
        })

        const removeBtns = document.querySelectorAll(".remove-cart-btn")
        const incBtns = document.querySelectorAll(".inc-cart-btn")
        const decBtns = document.querySelectorAll(".dec-cart-btn")

        const parent = document.querySelector(".data-holder") as HTMLElement

        removeBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const product = JSON.parse(parent.dataset.product as string)
                cart.remove(product.id)
            })
        })

        incBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const product = JSON.parse(parent.dataset.product as string)
                cart.add(product)
            })
        })

        decBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const product = JSON.parse(parent.dataset.product as string)
                cart.dec(product)
            })
        })


        const total = document.querySelector("#total") as HTMLElement
        const subtotal = document.querySelector("#subtotal") as HTMLElement
        const tax = document.querySelector("#tax") as HTMLElement
        const amount = cart.getTotal()
        total.textContent = `$${amount.total}`
        subtotal.textContent = `$${amount.subtotal}`
        tax.textContent = `$${amount.tax}`
        const checkoutBtn = document.querySelector("#checkout") as HTMLButtonElement
        checkoutBtn.addEventListener("click", (e) => {
            if (cart.items.length === 0) {
                showSnackbar("Please add products to cart", "warning")
                return
            }

            if (e.target) {
                (e.target as HTMLButtonElement).disabled = true;
                (e.target as HTMLButtonElement).classList.add("opacity-50");
                (e.target as HTMLButtonElement).textContent = "Processing...";
            }
            setTimeout(() => {
                const target = e.target as HTMLButtonElement
                target.disabled = false
                target.classList.remove("opacity-50")
                target.textContent = "Checkout"
                cart.checkout()
                showSnackbar("Order placed successfully", "success")
            }, 3000);
        })
    }
}


export const showSnackbar = (message: string, status: Status = "success") => {
    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
    }
    const snackbar = document.getElementById("snackbar")
    if (!snackbar) return
    snackbar.innerText = message;
    snackbar.classList.remove("hidden");
    snackbar.classList.add("block");
    snackbar.classList.add(colors[status]);
    setTimeout(() => {
        snackbar.classList.remove("block");
        snackbar.classList.add("hidden");
    }, 3000);
}
type Status = "success" | "error" | "warning"

interface ICart {
    items: ICartItem[],
    cartId: string | null,
    tax: number,
    quantity: number,
    getTotal: () => { subtotal: string, tax: string, total: string },
    add: (product: IProduct) => void,
    dec: (product: IProduct) => void,
    remove: (id: number) => void,
    checkout: () => void,
    clear: () => void
}

interface ICartItem extends IProduct {
    quantity: number
}