import { ICategory } from "./Interfaces";

class Categories {
    categories: ICategory[];

    constructor() {
        this.categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories') as string) : [
            { name: 'Entertainment', icon: 'theaters' },
            { name: 'Games', icon: 'toys_and_games' },
            { name: 'Food', icon: 'lunch_dining' },
            { name: 'Bills', icon: 'receipt_long' },
            { name: 'Shopping', icon: 'shopping_bag' },
            { name: 'Travel', icon: 'flight_takeoff' },
            { name: 'Other', icon: 'more_horiz' }
        ];
    }

    getCategories(): ICategory[] {
        return this.categories;
    }

    addCategory(category: ICategory): void {
        this.categories.push(category);
        this.syncCategories();
    }

    deleteCategory(name: string): void {
        this.categories = this.categories.filter(category => category.name !== name);
        this.syncCategories();
    }

    syncCategories(): void {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }
}

export { Categories };