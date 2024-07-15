export const API_URL = "http://localhost:5000";
export const WALLET_ADDRESS = "walletAddress";
export const ENDPOINTS = {
  CREATE_WALLET: `${API_URL}/createWallet`,
  ACCESS_WALLET: `${API_URL}/accessWallet`,
  GET_WALLET_BALANCE: `${API_URL}/getWalletBalance`,
  SEND_COIN: `${API_URL}/sendCoin`,
  GET_TRANSACTION_HISTORY: `${API_URL}/getTransactionHistory`,
  GET_MNEMONIC_WORDS: `${API_URL}/getMnemonicWords`,
  ADD_FUNDS: `${API_URL}/addFunds`,
  ADD_STAKE: `${API_URL}/addStake`,
  GET_PENDING_TRANSACTIONS: `${API_URL}/getPendingTransactions`,
  MINE_TRANSACTIONS: `${API_URL}/mineTransactions`,
  GET_STAKING_BALANCE: `${API_URL}/getStakingBalance`,
};
