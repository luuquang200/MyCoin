import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINTS, WALLET_ADDRESS } from '../config';

const Stake = () => {
  const [balance, setBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
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
        toast.error("Error fetching wallet");
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
        toast.error("Error fetching staking balance");
      }
    };

    fetchWallet();
    fetchStakingBalance();
  }, [userAddress]);

  const handleStake = () => {
    setErrors('');
    if (!amount) {
      setErrors('Amount is required.');
      toast.error('Amount is required.');
      return;
    }
    setShowPasswordPopup(true);
  };

  const handleConfirmStake = async () => {
    setErrors('');
    if (!password) {
      setErrors('Password is required.');
      toast.error('Password is required.');
      return;
    }

    try {
      await axios.post(ENDPOINTS.ADD_STAKE, {
        address: userAddress,
        amount,
        password,
      });

      setShowPasswordPopup(false);
      toast.success(`You have successfully staked ${amount} MCoin.`);

      // Refetch balance and staked amount after successful staking
      const fetchWallet = async () => {
        try {
          const response = await axios.get(ENDPOINTS.GET_WALLET, {
            params: { address: userAddress },
          });
          setBalance(response.data.balance);
        } catch (error) {
          console.error("Error fetching wallet:", error.response ? error.response.data : error.message);
          toast.error("Error fetching wallet");
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
          toast.error("Error fetching staking balance");
        }
      };

      fetchWallet();
      fetchStakingBalance();
    } catch (error) {
      console.error('Error adding stake:', error.response ? error.response.data : error.message);
      toast.error('Error adding stake. Please check the details and try again.');
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center  bg-gradient-to-r from-blue-100 to-purple-100">
      <ToastContainer />
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg bg-gray-100">
        <h2 className="mb-6 text-3xl font-semibold text-center">Stake Your Coins</h2>
        {errors && <p className="text-red-500 mb-4">{errors}</p>}
        <div className="mb-4 text-lg">
          <p>Balance: <span className="font-semibold">{balance} MCoin</span></p>
          <p>Staked Amount: <span className="font-semibold">{stakedAmount} MCoin</span></p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium text-gray-700">Amount</label>
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
          className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Stake
        </button>

        {showPasswordPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
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
                  className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmStake}
                  className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-slate-200 rounded-lg text-center">
          <p>Your MCoin is staked with our partner <span className="font-semibold">Staked.us</span></p>
          <p>Staked.us will create and maintain MCoin2 validators for you</p>
          <p>Earn up to <span className="font-semibold">6% annualized rewards</span></p>
        </div>
      </div>
    </div>
  );
};

export default Stake;
