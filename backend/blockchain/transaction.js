const SHA256 = require("crypto-js/sha256");
const TransactionMethods = require('./transactionMethods');

class Transaction {
    constructor(fromAddress, toAddress, amount, method) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.method = method || TransactionMethods.TRANSFER;
        this.timestamp = Date.now();
        this.nonce = Math.floor(Math.random() * 1e6); 
        this.transactionHash = this.calculateTransactionHash();
    }

    calculateTransactionHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp + this.nonce).toString();
    }
}

module.exports = Transaction;