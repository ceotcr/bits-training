"use strict";
class Employee {
    constructor(name, id, salary = 100000) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    calculateBonus() {
        return this.salary * 0.2;
    }
    get Salary() {
        return this.salary;
    }
}
class Manager extends Employee {
    calculateBonus() {
        return this.Salary * 0.3;
    }
}
class Engineer extends Employee {
    calculateBonus() {
        return this.Salary * 0.25;
    }
}
class Intern extends Employee {
    calculateBonus() {
        return this.Salary * 0.15;
    }
}
const emp1 = new Manager('Harry', 1);
const emp2 = new Engineer('Hermione', 2, 80000);
const emp3 = new Intern('Ron', 3, 20000);
console.log(`Bonus for ${emp1.name} is ${emp1.calculateBonus()}`);
console.log(`Bonus for ${emp2.name} is ${emp2.calculateBonus()}`);
console.log(`Bonus for ${emp3.name} is ${emp3.calculateBonus()}`);
