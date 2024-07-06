const express = require('express');
const walletController = require('../Controllers/walletController'); 
const router = express.Router();

router.post('/createWallet', walletController.createWallet);
router.get('/getWallet', walletController.getWallet);
router.post('/sendCoin', walletController.sendCoin);
router.get('/getTransactionHistory', walletController.getTransactionHistory);
router.get('/getMnemonicWords', walletController.getMnemonicWords);
router.post('/addFunds', walletController.addFunds);
router.post('/mineTransactions', walletController.minePendingTransactions);

module.exports = router;