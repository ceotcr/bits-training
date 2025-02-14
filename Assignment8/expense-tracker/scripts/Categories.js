class Categories {
    constructor() {
        this.categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [
            { name: 'Entertainment', icon: 'theaters' },
            { name: 'Games', icon: 'toys_and_games' },
            { name: 'Food', icon: 'lunch_dining' },
            { name: 'Bills', icon: 'receipt_long' },
            { name: 'Shopping', icon: 'shopping_bag' },
            { name: 'Travel', icon: 'flight_takeoff' },
            { name: 'Other', icon: 'more_horiz' }
        ];
    }
    getCategories() {
        return this.categories;
    }
    addCategory(category) {
        this.categories.push(category);
        this.syncCategories();
    }
    deleteCategory(name) {
        this.categories = this.categories.filter(category => category.name !== name);
        this.syncCategories();
    }
    syncCategories() {
        localStorage.setItem('categories', JSON.stringify(this.categories));
    }
}
export { Categories };
