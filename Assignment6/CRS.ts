class Vehicle {
    brand: string;
    model: string;
    protected rentPricePerDay: number;
    constructor(brand: string, model: string, rentPricePerDay: number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    override calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days * 1.1;
    }
}

class Bike extends Vehicle {
    override calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days * 0.8;
    }
}

class Truck extends Vehicle {
    override calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days * 1.5;
    }
}

const car = new Car('Mercedes', 'Maybach', 5000);
const bike = new Bike('Royal Enfield', 'Meteor', 500);
const truck = new Truck('Volvo', 'FH16', 700);

console.log(`Rental cost for ${car.brand} ${car.model} is ${car.calculateRentalCost(3)}`);
console.log(`Rental cost for ${bike.brand} ${bike.model} is ${bike.calculateRentalCost(3)}`);
console.log(`Rental cost for ${truck.brand} ${truck.model} is ${truck.calculateRentalCost(3)}`);