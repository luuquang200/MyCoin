const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/walletRoutes'); 

dotenv.config();

const app = express();
const port = 3000;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`MyCoin app listening at http://localhost:${port}`);
});