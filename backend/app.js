const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const Wallet = require('./Models/Wallet');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const app = express();
const port = 3001;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

// Wallet management routes
app.post('/createWallet', async (req, res) => {
  const { password, secretPhrase } = req.body;

  if (!password || !secretPhrase) {
    return res.status(400).json({ message: 'Password and secret recovery phrase are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Encrypt the secret phrase
    const encryptedPhrase = crypto.AES.encrypt(secretPhrase, password).toString();

    const wallet = new Wallet({
      password: hashedPassword,
      secretPhrase: encryptedPhrase
    });

    await wallet.save();

    res.status(201).json({ message: 'Wallet created successfully', walletId: wallet._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating wallet', error });
  }
});

app.get('/getWallet/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const wallet = await Wallet.findById(id);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, wallet.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Decrypt the secret phrase
    const bytes = crypto.AES.decrypt(wallet.secretPhrase, password);
    const secretPhrase = bytes.toString(crypto.enc.Utf8);

    res.status(200).json({ secretPhrase });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving wallet', error });
  }
});

app.listen(port, () => {
  console.log(`MyCoin app listening at http://localhost:${port}`);
});
