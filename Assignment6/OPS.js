"use strict";
class Payment {
    constructor(amount, date = new Date().toLocaleString()) {
        this.amount = amount;
        this.date = date;
    }
}
class CreditCardPayment extends Payment {
    constructor(amount, cardNumber, date = new Date().toLocaleString()) {
        super(amount, date);
        this.cardNumber = cardNumber;
    }
    getCardNumber() {
        return `**** **** **** ${this.cardNumber.slice(-4)}`;
    }
    processPayment() {
        console.log(`Payment of $${this.amount} processed with card number ${this.getCardNumber()} on ${this.date}`);
    }
}
class PayPalPayment extends Payment {
    constructor(amount, email, date = new Date().toLocaleString()) {
        super(amount, date);
        this.email = email;
    }
    getEmail() {
        return this.email.slice(0, 3) + '****' + this.email.slice(this.email.indexOf('@'));
    }
    processPayment() {
        console.log(`Payment of $${this.amount} processed with email ${this.getEmail()} on ${this.date}`);
    }
}
class CryptoPayment extends Payment {
    constructor(amount, walletAddress, date = new Date().toLocaleString()) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    getWalletAddress() {
        return `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-6)}`;
    }
    processPayment() {
        console.log(`Payment of $${this.amount} processed with wallet address ${this.getWalletAddress()} on ${this.date}`);
    }
}
const ccPayment = new CreditCardPayment(1000, '1234567890123456');
ccPayment.processPayment();
const ppPayment = new PayPalPayment(500, 'chetansapkal@gitmail.com');
ppPayment.processPayment();
const cryptoPayment = new CryptoPayment(200, '0x1234567890abcdef');
cryptoPayment.processPayment();
