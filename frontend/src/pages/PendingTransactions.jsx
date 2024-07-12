import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ENDPOINTS, WALLET_ADDRESS } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';

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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 w-full flex justify-center items-center">
      <ToastContainer />
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center text-teal-600">Pending Transactions</h2>
        {pendingTransactions.length === 0 ? (
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faInbox} size="6x" className="text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">No pending transactions</p>
          </div>
        ) : (
          <div className="mb-4">
            {pendingTransactions.map((tx, index) => (
              <div key={index} className="p-4 mb-2 border rounded-lg bg-gray-50 shadow-sm">
                <p className="text-lg"><strong>Time:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
                <p className="text-lg"><strong>From:</strong> {tx.fromAddress}</p>
                <p className="text-lg"><strong>To:</strong> {tx.toAddress}</p>
                <p className="text-lg"><strong>Amount:</strong> {tx.amount}</p>
                <p className="text-lg"><strong>Method:</strong> {tx.method}</p>
              </div>
            ))}
          </div>
        )}

        {pendingTransactions.length > 0 && (
            <button
            onClick={handleMineTransactions}
            className="w-full px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
            >
                Mine Transactions
            </button>
        )}
      </div>
    </div>
  );
};

export default PendingTransactions;
