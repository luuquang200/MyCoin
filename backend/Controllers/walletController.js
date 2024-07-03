const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const bip39 = require('bip39');
const { ethers } = require('ethers');
const Wallet = require('../models/Wallet');

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

        res.status(200).json({ address: wallet.address, mnemonic, privateKey });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wallet', error });
    }
};

exports.getMnemonicWords = (req, res) => {
    const mnemonic = bip39.generateMnemonic();
    res.status(200).json({ mnemonic });
};