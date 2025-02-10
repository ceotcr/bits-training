export const getCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    return await res.json();
}

export const getProducts = async ({ limit = 0, category = "" }) => {
    let url = 'https://fakestoreapi.com/products';
    if (category !== "") {
        url += `/category/${category}`;
    }
    if (limit > 0) {
        url += `?limit=${limit}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return await res.json();
}

export const getProduct = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    return await res.json();
}

export const deleteProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        return true;
    }
    return false;
}