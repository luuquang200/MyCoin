const axios = require('axios');

const API_URL = 'http://localhost:3000';

const createWallet = async () => {
  try {
    const response = await axios.post(`${API_URL}/createWallet`, {
      password: 'anhbakhia',
      mnemonic: 'my mnemonic phrase'
    });
    console.log('Create Wallet:', response.data);
  } catch (error) {
    console.error('Error creating wallet:', error.response ? error.response.data : error.message);
  }
};

const getWallet = async (address) => {
  try {
    console.log('Address:', address);

    const response = await axios.get(`${API_URL}/getWallet`, {
      address: address,
      password: 'anhbakhia'
    });
    console.log('Get Wallet:', response.data);
  } catch (error) {
    console.error('Error getting wallet:', error.response ? error.response.data : error.message);
  }
};

const sendCoin = async (senderAddress, recipientAddress) => {
  try {
    const response = await axios.post(`${API_URL}/sendCoin`, {
      senderAddress,
      recipientAddress,
      amount: 10,
      password: 'anhbakhia'
    });
    console.log('Send Coin:', response.data);
  } catch (error) {
    console.error('Error sending coin:', error.response ? error.response.data : error.message);
  }
};

const getTransactionHistory = async (address) => {
  try {
    const response = await axios.get(`${API_URL}/getTransactionHistory`, {
      params: { address }
    });
    console.log('Transaction History:', response.data);
  } catch (error) {
    console.error('Error getting transaction history:', error.response ? error.response.data : error.message);
  }
};

const addFunds = async (address, amount) => {
    try {
        const response = await axios.post(`${API_URL}/addFunds`, {
            address,
            amount
        });
        console.log('Add Funds:', response.data);
    } catch (error) {
        console.error('Error adding funds:', error.response ? error.response.data : error.message);
    }
};

const mineTransactions = async (miningRewardAddress) => {
  try {
      const response = await axios.post(`${API_URL}/mineTransactions`, {
        miningRewardAddress
      });
      console.log('Mine Transactions:', response.data);
  } catch (error) {
      console.error('Error mining transactions:', error.response ? error.response.data : error.message);
  }
};


const testAPIs = async () => {
    // await createWallet();

    const walletAddress = '0x04fc0EC9F79E5ADF81b6376dac3F172B892D09aC'; 
    await addFunds(walletAddress, 100); 
    await mineTransactions(walletAddress); 
    await getTransactionHistory(walletAddress);

    await getWallet(walletAddress);
    const recipientAddress = '0xeD8143a94D08eAE62a503aAc081BDEFAd12135E4'; 
    await sendCoin(walletAddress, recipientAddress);

    await mineTransactions(walletAddress); 

    await getTransactionHistory(walletAddress);
};

testAPIs();
