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

const emp101: IEmployee = { id: 101, name: 'Chetan', position: 'Developer', salary: 50000 };
const emp102: IManager = { id: 102, name: 'TCR', position: 'Project Manager', salary: 50000, teamSize: 5 };
const emp103: IEmployee = { id: 103, name: 'Chetan Sapkal', position: 'Tester', salary: 50000 };

const dept = new Department();

console.log('\nAdding employees to department');
dept.addEmployee(emp101);
dept.addEmployee(emp102);
dept.addEmployee(emp103);
dept.listEmployees();

console.log('\nRemoving employee from department');
dept.removeEmployee(101);
dept.listEmployees();

console.log('\nTotal salary of department:', dept.getTotalSalary());

const storage = new GenericStorage<IEmployee>();
storage.addData(emp101);
storage.addData(emp102);
storage.addData(emp103);

console.log('\nData in storage:', storage.getData());

console.log('\nUpdating salary of employee');
const updatedEmp = updateSalary(emp101, 60000);
console.log('Updated employee:', updatedEmp);
