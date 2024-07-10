const Block = require('./block');
const Transaction = require('./transaction');
const TransactionMethods = require('./transactionMethods');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
        this.stakeholders = {}; // save the amount of stake for each address
    }

    createGenesisBlock() {
        return new Block(Date.parse("2024-01-01"), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward, TransactionMethods.REWARD);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.staker = miningRewardAddress;
        block.hash = block.calculateHash();

        console.log(`Block successfully mined by ${miningRewardAddress}!`);
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    createTransaction(transaction) {
        if (!transaction.fromAddress) {
            throw new Error('Transaction must include from address');
        }

        if (transaction.toAddress !== null && this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    getAllTransactionsForWallet(address) {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    tx.block = block.hash; 
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    getAllTransactions() {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                tx.block = block.hash; 
                txs.push(tx);
            }
        }

        return txs;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    addFunds(address, amount) {
        this.chain.push(new Block(Date.now(), [new Transaction(null, address, amount, TransactionMethods.ADD_FUNDS)], this.getLatestBlock().hash));
    }

    addStake(address, amount) {
        if (this.stakeholders[address]) {
            this.stakeholders[address] += amount;
        } else {
            this.stakeholders[address] = amount;
        }
        this.chain.push(new Block(Date.now(), [new Transaction(address, null, amount, TransactionMethods.ADD_STAKE)], this.getLatestBlock().hash));
    }

    getStake(address) {
        return this.stakeholders[address] || 0;
    }

    selectStakingAddress() {
        const stakeSum = Object.values(this.stakeholders).reduce((a, b) => a + b, 0);
        if (stakeSum === 0) return null;

        let random = Math.random() * stakeSum;
        for (const address in this.stakeholders) {
            if (this.stakeholders.hasOwnProperty(address)) {
                if (random < this.stakeholders[address]) {
                    return address;
                }
                random -= this.stakeholders[address];
            }
        }

        return null;
    }
}

module.exports = Blockchain;
