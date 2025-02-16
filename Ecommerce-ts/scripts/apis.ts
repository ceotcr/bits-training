export const getCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data: string[] = await res.json();
    return data;
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
    const data: IProduct[] = await res.json();
    return data;
}

export const getProduct = async (id: number) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }
    const data: IProduct = await res.json();
    return data;
}

export const deleteProduct = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE"
    });
    if (response.ok) {
        return true;
    }
    return false;
}


export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}
