const Block = require('./block');
const Transaction = require('./transaction');

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

    minePendingTransactions(stakingAddress) {
        const rewardTx = new Transaction(null, stakingAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
    
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.staker = stakingAddress;
        block.hash = block.calculateHash();
    
        console.log(`Block successfully mined by ${stakingAddress}!`);
        this.chain.push(block);
    
        this.pendingTransactions = [];
    }
    

    createTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
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
                    txs.push(tx);
                }
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
        this.chain.push(new Block(Date.now(), [new Transaction(null, address, amount)], this.getLatestBlock().hash));
    }
    
    addStake(address, amount) {
        if (this.stakeholders[address]) {
            this.stakeholders[address] += amount;
        } else {
            this.stakeholders[address] = amount;
        }
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
