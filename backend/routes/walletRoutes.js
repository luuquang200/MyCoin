const express = require('express');
const walletController = require('../Controllers/walletController'); 
const router = express.Router();

router.post('/createWallet', walletController.createWallet);
router.get('/accessWallet', walletController.accessWallet);
router.get('/getWalletBalance', walletController.getWalletBalance);
router.post('/sendCoin', walletController.sendCoin);
router.get('/getTransactionHistory', walletController.getTransactionHistory);
router.get('/getMnemonicWords', walletController.getMnemonicWords);
router.post('/addFunds', walletController.addFunds);
router.post('/addStake', walletController.addStake);
router.get('/getStakingBalance', walletController.getStakingBalance);
router.get('/getPendingTransactions', walletController.getPendingTransactions);
router.post('/mineTransactions', walletController.minePendingTransactions);

module.exports = router;