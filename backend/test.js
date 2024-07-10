const axios = require('axios');

const BASE_URL = 'http://localhost:5000'; 

async function createWallet(password, mnemonic) {
    try {
        const response = await axios.post(`${BASE_URL}/createWallet`, {
            password,
            mnemonic
        });
        console.log('Create Wallet:', response.data);
    } catch (error) {
        console.error('Error creating wallet:', error.response ? error.response.data : error.message);
    }
}

async function getWallet(address, password) {
    try {
        const response = await axios.get(`${BASE_URL}/getWallet`, {
            params: { address, password }
        });
        console.log('Get Wallet:', response.data);
    } catch (error) {
        console.error('Error getting wallet:', error.response ? error.response.data : error.message);
    }
}

async function sendCoin(senderAddress, recipientAddress, amount, password) {
    try {
        const response = await axios.post(`${BASE_URL}/sendCoin`, {
            senderAddress,
            recipientAddress,
            amount,
            password
        });
        console.log('Send Coin:', response.data);
    } catch (error) {
        console.error('Error sending coin:', error.response ? error.response.data : error.message);
    }
}

async function getTransactionHistory(address) {
    try {
        const response = await axios.get(`${BASE_URL}/getTransactionHistory`, {
            params: { address }
        });
        console.log('Transaction History:', response.data);
    } catch (error) {
        console.error('Error getting transaction history:', error.response ? error.response.data : error.message);
    }
}

async function addFunds(address, amount) {
    try {
        const response = await axios.post(`${BASE_URL}/addFunds`, {
            address,
            amount
        });
        console.log('Add Funds:', response.data);
    } catch (error) {
        console.error('Error adding funds:', error.response ? error.response.data : error.message);
    }
}

async function addStake(address, amount) {
    try {
        const response = await axios.post(`${BASE_URL}/addStake`, {
            address,
            amount,
            password: 'anhbakhia'
        });
        console.log('Add Stake:', response.data);
    } catch (error) {
        console.error('Error adding stake:', error.response ? error.response.data : error.message);
    }
}

async function minePendingTransactions(miningRewardAddress) {
    try {
        const response = await axios.post(`${BASE_URL}/mineTransactions`, {
            miningRewardAddress
        });
        console.log('Mine Pending Transactions:', response.data);
    } catch (error) {
        console.error('Error mining pending transactions:', error.response ? error.response.data : error.message);
    }
}

async function getPendingTransactions() {
    try {
        const response = await axios.get(`${BASE_URL}/getPendingTransactions`);
        console.log('Pending Transactions:', response.data);
    } catch (error) {
        console.error('Error getting pending transactions:', error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    // const PASSWORD = 'anhbakhia';
    // const WALLET_ADDRESS = '0x04fc0EC9F79E5ADF81b6376dac3F172B892D09aC';
    // const SENDER_ADDRESS = '0x80c55a8ee990D3406b07A3E8c0d0Ce3B002bE1d6';
    // const RECIPIENT_ADDRESS = '0xeD8143a94D08eAE62a503aAc081BDEFAd12135E4';
    // const AMOUNT = 11;
    // const ADD_FUNDS_AMOUNT = 100;
    
    // console.log('Getting wallet...');
    // await getWallet(WALLET_ADDRESS, PASSWORD);

    // console.log('Adding funds...');
    // await addFunds(WALLET_ADDRESS, ADD_FUNDS_AMOUNT);
    // await addFunds(SENDER_ADDRESS, ADD_FUNDS_AMOUNT);

    // console.log('Adding stake...');
    // await addStake(WALLET_ADDRESS, AMOUNT);

    // console.log('Sending coin...');
    // await sendCoin(SENDER_ADDRESS, RECIPIENT_ADDRESS, AMOUNT, PASSWORD);

    // console.log('Getting pending transactions...');
    // await getPendingTransactions();

    // console.log('Mining pending transactions...');
    // await minePendingTransactions(WALLET_ADDRESS);

    // console.log('Getting transaction history...');
    // await getTransactionHistory(WALLET_ADDRESS);
    const WALLET_ADDRESS = '0x45Acee20aE53523ED41f24A896783970C2E09744';
    const AMOUNT = 100;
    // add funds to the wallet
    await addFunds(WALLET_ADDRESS, AMOUNT);
}

runTests();
