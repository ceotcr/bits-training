/*
## Online Payment System

Create Payment class with amount, date.
Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
Abstraction: Hide sensitive details like #cardNumber.
*/

class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
}

class CreditCardPayment extends Payment {
    #cardNumber;
    constructor(amount, date, cardNumber) {
        super(amount, date);
        this.#cardNumber = cardNumber;
    }

    getCardNumber() {
        return `**** **** **** ${this.#cardNumber.slice(-4)}`;
    }

    processPayment() {
        console.log(`Payment of ${this.amount} processed with card number ${this.getCardNumber()} on ${this.date}`);
    }
}

class PayPalPayment extends Payment {
    #email;
    constructor(amount, date, email) {
        super(amount, date);
        this.#email = email;
    }

    getEmail() {
        return this.#email.slice(0, 3) + '****' + this.#email.slice(this.#email.indexOf('@'));
    }

    processPayment() {
        console.log(`Payment of ${this.amount} processed with email ${this.getEmail()} on ${this.date}`);
    }
}

class CryptoPayment extends Payment {
    #walletAddress;
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.#walletAddress = walletAddress;
    }

    get walletAddress() {
        return `${this.#walletAddress.slice(0, 6)}...${this.#walletAddress.slice(-6)}`;
    }

    processPayment() {
        console.log(`Payment of ${this.amount} processed with wallet address ${this.walletAddress} on ${this.date}`);
    }
}

const ccPayment = new CreditCardPayment(1000, '2021-08-14', '1234567890123456');
ccPayment.processPayment();

const ppPayment = new PayPalPayment(500, '2021-08-14', 'chetansapkal@gitmail.com');
ppPayment.processPayment();

const cryptoPayment = new CryptoPayment(200, '2021-08-14', '0x1234567890abcdef');
cryptoPayment.processPayment();