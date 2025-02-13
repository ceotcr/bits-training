"use strict";
class Department {
    constructor() {
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployee(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }
    getTotalSalary() {
        return this.employees.reduce((acc, emp) => acc + emp.salary, 0);
    }
    listEmployees() {
        console.log(this.employees);
    }
}
class GenericStorage {
    constructor() {
        this.data = [];
    }
    addData(data) {
        this.data.push(data);
    }
    removeData(data) {
        this.data = this.data.filter(d => d !== data);
    }
    getData() {
        return this.data;
    }
}
function updateSalary(employee, newSalary) {
    return { ...employee, salary: newSalary };
}

const emp101 = { id: 101, name: 'Chetan', position: 'Developer', salary: 50000 };
const emp102 = { id: 102, name: 'TCR', position: 'Project Manager', salary: 50000, teamSize: 5 };
const emp103 = { id: 103, name: 'Chetan Sapkal', position: 'Tester', salary: 50000 };

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

const storage = new GenericStorage();
storage.addData(emp101);
storage.addData(emp102);
storage.addData(emp103);
console.log('\nData in storage:', storage.getData());

console.log('\nUpdating salary of employee');

const updatedEmp = updateSalary(emp101, 60000);
console.log('Updated employee:', updatedEmp);
console.log('Original employee:', emp101);


/* Output:
node .\EMS.js

Adding employees to department
[
  { id: 101, name: 'Chetan', position: 'Developer', salary: 50000 },
  {
    id: 102,
    name: 'TCR',
    position: 'Project Manager',
    salary: 50000,
    teamSize: 5
  },
  { id: 103, name: 'Chetan Sapkal', position: 'Tester', salary: 50000 }
]

Removing employee from department
[
  {
    id: 102,
    name: 'TCR',
    position: 'Project Manager',
    salary: 50000,
    teamSize: 5
  },
  { id: 103, name: 'Chetan Sapkal', position: 'Tester', salary: 50000 }
]

Total salary of department: 100000

Data in storage: [
  { id: 101, name: 'Chetan', position: 'Developer', salary: 50000 },
  {
    id: 102,
    name: 'TCR',
    position: 'Project Manager',
    salary: 50000,
    teamSize: 5
  },
  { id: 103, name: 'Chetan Sapkal', position: 'Tester', salary: 50000 }
]

Updating salary of employee
Updated employee: { id: 101, name: 'Chetan', position: 'Developer', salary: 60000 }
Original employee: { id: 101, name: 'Chetan', position: 'Developer', salary: 50000 }

*/