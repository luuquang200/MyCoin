# MyCoin Wallet

MyCoin Wallet is a cryptocurrency wallet system built with a modern tech stack. It offers various functionalities, including wallet creation, account statistics, coin transfer, staking, and transaction history.

## Features

### 1. Create Wallet
- Generate Private Key
- Generate Passphrase
- Securely store wallet credentials

### 2. Account Statistics
- View account balance

### 3. Send Coins
- Transfer coins to another wallet address

### 4. Staking
- Stake coins to earn rewards

### 5. Transaction History
- View transaction history for your account

## Getting Started

### Prerequisites
- Docker
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/luuquang200/MyCoin.git
    cd mycoin-wallet
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

### Running the Application

#### Using Docker

1. Build and run the Docker containers:
    ```bash
    docker-compose up --build
    ```

#### Without Docker

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend server:
    ```bash
    cd frontend
    npm run dev
    ```

### Demo

You can access the video demo of the MyCoin Wallet [here](https://youtu.be/CTf4mnrkRYs).

## References

- [Creating a Bitcoin Wallet in Node.js](https://medium.com/@barrylavides/creating-a-bitcoin-wallet-in-node-js-part-1-legacy-wallet-393d1470e096)
- [Building a Blockchain Application with Node.js: A Step-by-Step Guide](https://vivekmoradiya.medium.com/building-a-blockchain-application-with-node-js-a-step-by-step-guide-4f1c8ba810dd)

