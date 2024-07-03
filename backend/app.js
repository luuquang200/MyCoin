const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const walletController = require('./Controllers/walletController');

dotenv.config();

const app = express();
const port = 3000;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.post('/createWallet', walletController.createWallet);
app.get('/getWallet', walletController.getWallet);
app.get('/getMnemonicWords', walletController.getMnemonicWords);

app.listen(port, () => {
  console.log(`MyCoin app listening at http://localhost:${port}`);
});