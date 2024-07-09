const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const bip39 = require('bip39');
const { ethers } = require('ethers');
const Wallet = require('../models/Wallet');
const Blockchain = require('../blockchain/blockchain');
const Transaction = require('../blockchain/transaction');
const myCoin = new Blockchain();

exports.createWallet = async (req, res) => {
    const { password, mnemonic } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (!mnemonic) {
        return res.status(400).json({ message: 'Mnemonic is required' });
    }

    if (!bip39.validateMnemonic(mnemonic)) {
        return res.status(400).json({ message: 'Invalid mnemonic' });
    }

    try {
        const wallet = ethers.Wallet.fromPhrase(mnemonic);

        // Hash the password and encrypt the private key and mnemonic
        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedPrivateKey = crypto.AES.encrypt(wallet.privateKey, password).toString();
        const encryptedMnemonic = crypto.AES.encrypt(mnemonic, password).toString();

        const newWallet = new Wallet({
            address: wallet.address,
            mnemonic: encryptedMnemonic,
            privateKey: encryptedPrivateKey,
            password: hashedPassword
        });

        await newWallet.save();

        // initial balance for the wallet
        myCoin.addFunds(wallet.address, 1000);

        res.status(201).json({ message: 'Wallet created successfully', address: wallet.address });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating wallet', error });
    }
};

exports.getWallet = async (req, res) => {
    const { address, password } = req.body;

    if (!address || !password) {
        return res.status(400).json({ message: 'Address and password are required' });
    }

    try {
        const wallet = await Wallet.findOne({ address });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, wallet.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Decrypt the private key and mnemonic
        const bytesPrivateKey = crypto.AES.decrypt(wallet.privateKey, password);
        const privateKey = bytesPrivateKey.toString(crypto.enc.Utf8);

        const bytesMnemonic = crypto.AES.decrypt(wallet.mnemonic, password);
        const mnemonic = bytesMnemonic.toString(crypto.enc.Utf8);

        const balance = myCoin.getBalanceOfAddress(wallet.address);

        res.status(200).json({ address: wallet.address, mnemonic, privateKey, balance });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet', error });
    }
};

exports.getMnemonicWords = (req, res) => {
    let mnemonic = bip39.generateMnemonic();

    while (Wallet.findOne({ mnemonic })) {
        mnemonic = bip39.generateMnemonic();
    }
    
    res.status(200).json({ mnemonic });
};


// Send Coin
exports.sendCoin = async (req, res) => {
    const { senderAddress, recipientAddress, amount, password } = req.body;

    if (!senderAddress || !recipientAddress || !amount || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const wallet = await Wallet.findOne({ address: senderAddress });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const isMatch = await bcrypt.compare(password, wallet.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (myCoin.getBalanceOfAddress(senderAddress) < amount) {
            return res.status(400).json({ message: 'Not enough balance' });
        }

        const transaction = new Transaction(senderAddress, recipientAddress, amount);
        myCoin.createTransaction(transaction);

        res.status(200).json({ message: 'Transaction added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending coin', error });
    }
};


// Get Transaction History
exports.getTransactionHistory = async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }

    try {
        const transactions = myCoin.getAllTransactionsForWallet(address);
        const detailedTransactions = transactions.map(tx => ({
            transactionHash: tx.transactionHash,
            method: tx.method,
            timestamp: tx.timestamp,
            block: tx.block,
            from: tx.fromAddress,
            to: tx.toAddress,
            value: tx.amount
        }));

        res.status(200).json(detailedTransactions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving transaction history', error });
    }
};

// Add Funds (Only for testing purposes)
exports.addFunds = async (req, res) => {
    const { address, amount } = req.body;

    if (!address || !amount) {
        return res.status(400).json({ message: 'Address and amount are required' });
    }

    try {
        myCoin.addFunds(address, amount);
        res.status(200).json({ message: 'Funds added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding funds', error });
    }
};

// Add Stake
exports.addStake = async (req, res) => {
    const { address, amount } = req.body;

    if (!address || !amount) {
        return res.status(400).json({ message: 'Address and amount are required' });
    }

    if (myCoin.getBalanceOfAddress(address) < amount) {
        return res.status(400).json({ message: 'Not enough balance' });
    }

    try {
        myCoin.addStake(address, amount);
        res.status(200).json({ message: 'Stake added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding stake', error });
    }
};

// Mine Pending Transactions
exports.minePendingTransactions = async (req, res) => {
    const { miningRewardAddress } = req.body;

    if (!miningRewardAddress) {
        return res.status(400).json({ message: 'Mining reward address is required' });
    }

    if (myCoin.selectStakingAddress() !== miningRewardAddress) {
        return res.status(400).json({ message: 'You are not the staker' });
    }

    try {
        myCoin.minePendingTransactions(miningRewardAddress);
        res.status(200).json({ message: 'Block successfully mined!' });
    } catch (error) {
        res.status(500).json({ message: 'Error mining transactions', error });
    }
};


// Get pending transactions
exports.getPendingTransactions = async (req, res) => {
    const pendingTransactions = myCoin.pendingTransactions;
    res.status(200).json(pendingTransactions);
};