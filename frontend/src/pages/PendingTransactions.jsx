import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINTS, WALLET_ADDRESS } from '../config';

const PendingTransactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [miningRewardAddress, setMiningRewardAddress] = useState(localStorage.getItem(WALLET_ADDRESS));

  useEffect(() => {
    const fetchPendingTransactions = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_PENDING_TRANSACTIONS);
        setPendingTransactions(response.data);
      } catch (error) {
        console.error("Error fetching pending transactions:", error.response ? error.response.data : error.message);
        toast.error("Error fetching pending transactions");
      }
    };

    fetchPendingTransactions();
  }, []);

  const handleMineTransactions = async () => {
    try {
      const response = await axios.post(ENDPOINTS.MINE_TRANSACTIONS, { miningRewardAddress });
      toast.success(response.data.message);
      // Refetch pending transactions after mining
      const fetchPendingTransactions = async () => {
        try {
          const response = await axios.get(ENDPOINTS.GET_PENDING_TRANSACTIONS);
          setPendingTransactions(response.data);
        } catch (error) {
          console.error("Error fetching pending transactions:", error.response ? error.response.data : error.message);
          toast.error("Error fetching pending transactions");
        }
      };
      fetchPendingTransactions();
    } catch (error) {
      console.error("Error mining transactions:", error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "Error mining transactions. Please check the details and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full flex justify-center items-center">
      <ToastContainer />
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center">Pending Transactions</h2>
        {pendingTransactions.length === 0 ? (
          <p className="text-center text-gray-600">No pending transactions</p>
        ) : (
          <div className="mb-4">
            {pendingTransactions.map((tx, index) => (
              <div key={index} className="p-4 mb-2 border rounded-lg">
                <p><strong>From:</strong> {tx.fromAddress}</p>
                <p><strong>To:</strong> {tx.toAddress}</p>
                <p><strong>Amount:</strong> {tx.amount}</p>
                <p><strong>Method:</strong> {tx.method}</p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleMineTransactions}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Mine Transactions
        </button>
      </div>
    </div>
  );
};

export default PendingTransactions;
