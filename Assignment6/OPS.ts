class Payment {
    amount: number;
    date: string;
    constructor(amount: number, date: string = new Date().toLocaleString()) {
        this.amount = amount;
        this.date = date;
    }
}

class CreditCardPayment extends Payment {
    private cardNumber;
    constructor(amount: number, cardNumber: string, date: string = new Date().toLocaleString()) {
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
    private email;
    constructor(amount: number, email: string, date: string = new Date().toLocaleString()) {
        super(amount, date);
        this.email = email;
    }

    getEmail(): string {
        return this.email.slice(0, 3) + '****' + this.email.slice(this.email.indexOf('@'));
    }

    processPayment(): void {
        console.log(`Payment of $${this.amount} processed with email ${this.getEmail()} on ${this.date}`);
    }
}

class CryptoPayment extends Payment {
    private walletAddress;
    constructor(amount: number, walletAddress: string, date: string = new Date().toLocaleString()) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }

    getWalletAddress(): string {
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