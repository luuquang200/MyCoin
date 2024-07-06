const express = require('express');
const walletController = require('../controllers/walletController');
const router = express.Router();

router.post('/createWallet', walletController.createWallet);
router.post('/getWallet', walletController.getWallet);
router.post('/sendCoin', walletController.sendCoin);
router.get('/getTransactionHistory', walletController.getTransactionHistory);
router.get('/getMnemonicWords', walletController.getMnemonicWords);
router.post('/addFunds', walletController.addFunds);

module.exports = router
