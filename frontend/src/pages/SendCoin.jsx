import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS, WALLET_ADDRESS } from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendCoin = () => {
  const [balance, setBalance] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("MyCoin");
  const [password, setPassword] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
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
    fetchWallet();
  }, [userAddress]);

  const handleSend = async () => {
    if (!toAddress || !amount || !token) {
      toast.error("All fields are required.");
      return;
    }

    if (Number(amount) > balance) {
      toast.error("Amount exceeds balance.");
      return;
    }

    setShowPasswordPopup(true);
  };

  const handleConfirmSend = async () => {
    try {
      const response = await axios.post(ENDPOINTS.SEND_COIN, {
        senderAddress: userAddress,
        recipientAddress: toAddress,
        amount,
        password,
      });
      console.log("Send Coin:", response.data);
      setShowPasswordPopup(false);
      setBalance(balance - amount);
      toast.success("Transaction created successfully!");
    } catch (error) {
      console.error("Error sending coin:", error.response ? error.response.data : error.message);
      toast.error("Failed to send coin. Please check the details and try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-teal-600">Send Coin</h2>
        <div className="mb-4 text-center text-lg">
          <p>Balance: <span className="font-semibold">{balance}</span> MyCoin</p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">To Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            required
          />
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Token</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          >
            <option value="MyCoin">MyCoin</option>
            {/* Add more tokens here if needed */}
          </select>
        </div>
        <button
          onClick={handleSend}
          className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Create transaction
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
                  className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSend}
                  className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default SendCoin;
