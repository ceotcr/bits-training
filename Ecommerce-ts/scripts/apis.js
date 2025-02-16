export const getCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data;
};
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
    const data = await res.json();
    return data;
};
export const getProduct = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    const data = await res.json();
    return data;
};
export const deleteProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        return true;
    }
    return false;
};
