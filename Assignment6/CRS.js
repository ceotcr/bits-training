"use strict";
/*
## Vehicle Rental System

Create Vehicle class with brand, model, rentPricePerDay.
Subclasses: Car, Bike, Truck.
Polymorphism: Implement calculateRentalCost(days).
*/
class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    calculateRentalCost(days) {
        return this.rentPricePerDay * days;
    }
}
class Car extends Vehicle {
    calculateRentalCost(days) {
        return this.rentPricePerDay * days * 1.1;
    }
}
class Bike extends Vehicle {
    calculateRentalCost(days) {
        return this.rentPricePerDay * days * 0.8;
    }
}
class Truck extends Vehicle {
    calculateRentalCost(days) {
        return this.rentPricePerDay * days * 1.5;
    }
}
const car = new Car('Mercedes', 'Maybach', 5000);
const bike = new Bike('Royal Enfield', 'Meteor', 500);
const truck = new Truck('Volvo', 'FH16', 700);
console.log(`Rental cost for ${car.brand} ${car.model} is ${car.calculateRentalCost(3)}`);
console.log(`Rental cost for ${bike.brand} ${bike.model} is ${bike.calculateRentalCost(3)}`);
console.log(`Rental cost for ${truck.brand} ${truck.model} is ${truck.calculateRentalCost(3)}`);
