interface IEmployee {
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface IManager extends IEmployee {
    teamSize: number;
}

class Department {
    private employees: IEmployee[] = [];
    addEmployee(employee: IEmployee): void {
        this.employees.push(employee);
    }
    removeEmployee(id: number): void {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }
    getTotalSalary(): number {
        return this.employees.reduce((acc, emp) => acc + emp.salary, 0);
    }
    listEmployees(): void {
        console.log(this.employees);
    }
}

class GenericStorage<T> {
    private data: T[] = [];
    addData(data: T): void {
        this.data.push(data);
    }
    removeData(data: T): void {
        this.data = this.data.filter(d => d !== data);
    }
    getData(): T[] {
        return this.data;
    }
}

function updateSalary<T extends IEmployee>(employee: T, newSalary: number): T {
    return { ...employee, salary: newSalary } as T;
}

