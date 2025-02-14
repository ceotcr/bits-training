import { IExpense } from "./Interfaces";

class ExpenseTracker {
    private expenses: IExpense[] = [];
    private budget: number = 0;

    constructor() {
        this.expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses') as string) : [
            {
                id: 1,
                name: 'Groceries',
                amount: 100,
                to: 'Store',
                description: 'Bought some groceries from the store',
                category: {
                    name: 'Food',
                    icon: 'lunch_dining'
                },
                date: new Date('2025-02-11').toISOString().split("T")[0]
            },
            {
                id: 2,
                name: 'Internet',
                amount: 50,
                to: 'Store',
                description: 'Bought some groceries from the store',
                category: {
                    name: 'Food',
                    icon: 'lunch_dining'
                },
                date: new Date('2025-02-12').toISOString().split("T")[0]
            },
            {
                id: 3,
                name: 'Movies',
                amount: 20,
                to: 'Store',
                description: 'Bought some groceries from the store',
                category: {
                    name: 'Food',
                    icon: 'lunch_dining'
                },
                date: new Date('2025-02-13').toISOString().split("T")[0]
            },
            {
                id: 4,
                name: 'Flight',
                amount: 200,
                to: 'Store',
                description: 'Bought some groceries from the store',
                category: {
                    name: 'Food',
                    icon: 'lunch_dining'
                },
                date: new Date('2025-02-14').toISOString().split("T")[0]
            }
        ];
        this.budget = localStorage.getItem('budget') ? parseInt(localStorage.getItem('budget') as string) : 0;
    }
    getId(): number {
        return this.expenses.reduce((max, expense) => expense.id > max ? expense.id : max, 0) + 1;
    }
    addExpense(expense: IExpense): void {
        this.expenses.push(expense);
        this.syncExpenses();
    }

    setBudget(budget: number): void {
        this.budget = budget;
        localStorage.setItem('budget', budget.toString());
    }

    getExpenses(): IExpense[] {
        return this.expenses;
    }

    getExpensesByCategory(category: string): IExpense[] {
        return this.expenses.filter(expense => expense.category.name === category);
    }

    getByDateRange(range: "today" | "month" | "year" | "all"): IExpense[] {
        const now = new Date();
        switch (range) {
            case "today":
                return this.expenses.filter(expense => new Date(expense.date).getDate() === now.getDate());
            case "month":
                return this.expenses.filter(expense => new Date(expense.date).getMonth() === now.getMonth());
            case "year":
                return this.expenses.filter(expense => new Date(expense.date).getFullYear() === now.getFullYear());
            case "all":
                return this.expenses
        }
    }

    getExpense(id: number): IExpense | undefined {
        return this.expenses.find(expense => expense.id === id);
    }

    totalExpenses(): number {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    monthlyExpenses(): number {
        const now = new Date();
        return this.expenses.filter(expense => new Date(expense.date).getMonth() === now.getMonth()).reduce((total, expense) => total + expense.amount, 0);
    }

    dailyExpenses(): number {
        const now = new Date();
        return this.expenses.filter(expense => new Date(expense.date).getDate() === now.getDate()).reduce((total, expense) => total + expense.amount, 0);
    }

    gradedBudget(): {
        grade: 'success' | 'warning' | 'danger';
        amount: number;
        budget: number;
    } {
        const total = this.monthlyExpenses();
        if (total < this.budget) {
            return {
                grade: 'success',
                amount: this.budget - this.monthlyExpenses(),
                budget: this.budget
            };
        } else if (total < (this.budget + this.budget * 0.1)) {
            return {
                grade: 'warning',
                amount: this.budget - this.monthlyExpenses(),
                budget: this.budget
            };
        } else {
            return {
                grade: 'danger',
                amount: this.budget - this.monthlyExpenses(),
                budget: this.budget
            };
        }
    }

    deleteExpense(id: number): void {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.syncExpenses();
    }

    updateExpense(id: number, expense: IExpense): void {
        const index = this.expenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            this.expenses[index] = expense;
            this.syncExpenses();
        }
    }

    syncExpenses(): void {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
}

export { ExpenseTracker };