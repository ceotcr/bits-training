export const user = {
    id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "{}").id : null,
    token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "{}").token : null,
    async login(username, password) {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        let data = null;
        try {
            data = await response.json();
        }
        catch (error) {
            showSnackbar("Invalid username or password", "error");
            return false;
        }
        if (!response.ok) {
            showSnackbar(data.message, "error");
            return false;
        }
        showSnackbar("Login successful", "success");
        this.id = decode(data.token).sub;
        this.token = data.token;
        localStorage.setItem('user', JSON.stringify({ id: this.id, token: this.token }));
        window.location.href = '../';
        return true;
    },
    logout() {
        this.id = null;
        this.token = null;
        localStorage.removeItem('user');
    }
};
export const decode = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
const showSnackbar = (message, status = "success") => {
    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500",
    };
    const snackbar = document.getElementById("snackbar");
    snackbar.innerText = message;
    snackbar.classList.remove("hidden");
    snackbar.classList.add("block");
    snackbar.classList.add(colors[status]);
    setTimeout(() => {
        snackbar.classList.remove("block");
        snackbar.classList.add("hidden");
    }, 3000);
};
