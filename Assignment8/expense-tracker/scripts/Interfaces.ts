export interface IExpense {
    id: number;
    amount: number;
    name: string;
    category: ICategory;
    date: string;
    description: string;
    to: string;
    recurring: boolean;
}

export interface ICategory {
    name: string;
    icon: string;
}