import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS, WALLET_ADDRESS } from '../config';

const Stake = () => {
  const [balance, setBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errors, setErrors] = useState('');
  const userAddress = localStorage.getItem(WALLET_ADDRESS);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_WALLET, {
          params: { address: userAddress },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching wallet:", error.response ? error.response.data : error.message);
      }
    };

    const fetchStakingBalance = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_STAKING_BALANCE, {
          params: { address: userAddress },
        });
        setStakedAmount(response.data.stake);
      } catch (error) {
        console.error("Error fetching staking balance:", error.response ? error.response.data : error.message);
      }
    };

    fetchWallet();
    fetchStakingBalance();
  }, [userAddress]);

  const handleStake = () => {
    setErrors('');
    if (!amount) {
      setErrors('Amount is required.');
      return;
    }
    setShowPasswordPopup(true);
  };

  const handleConfirmStake = async () => {
    setErrors('');
    if (!password) {
      setErrors('Password is required.');
      return;
    }

    try {
      await axios.post(ENDPOINTS.ADD_STAKE, {
        address: userAddress,
        amount,
        password,
      });

      setShowPasswordPopup(false);
      setShowSuccessPopup(true);

      // Refetch balance and staked amount after successful staking
      const fetchWallet = async () => {
        try {
          const response = await axios.get(ENDPOINTS.GET_WALLET, {
            params: { address: userAddress },
          });
          setBalance(response.data.balance);
        } catch (error) {
          console.error("Error fetching wallet:", error.response ? error.response.data : error.message);
        }
      };

      const fetchStakingBalance = async () => {
        try {
          const response = await axios.get(ENDPOINTS.GET_STAKING_BALANCE, {
            params: { address: userAddress },
          });
          setStakedAmount(response.data.stake);
        } catch (error) {
          console.error("Error fetching staking balance:", error.response ? error.response.data : error.message);
        }
      };

      fetchWallet();
      fetchStakingBalance();
    } catch (error) {
      console.error('Error adding stake:', error.response ? error.response.data : error.message);
      setErrors('Error adding stake. Please check the details and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Stake Your Coins</h2>
        {errors && <p className="text-red-500">{errors}</p>}
        <div className="mb-4">
          <p>Balance: {balance} MyCoin</p>
          <p>Staked Amount: {stakedAmount} MyCoin</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleStake}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg"
        >
          Stake
        </button>

        {showPasswordPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Enter Password</h2>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowPasswordPopup(false)}
                  className="px-4 py-2 text-white bg-gray-600 rounded-lg">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmStake}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Stake Successful</h2>
              <p className="mb-4">You have successfully staked {amount} MyCoin.</p>
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stake;
