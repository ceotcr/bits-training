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
