import { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, WALLET_ADDRESS } from '../config';
import DetailModal from '../components/Transaction/DetailModal';
import { Eye } from 'lucide-react';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const userAddress = localStorage.getItem(WALLET_ADDRESS);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(ENDPOINTS.GET_TRANSACTION_HISTORY, {
          // params: { address: userAddress },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error.response ? error.response.data : error.message);
        setErrors('Error fetching transaction history.');
      }
    };

    fetchTransactionHistory();
  }, [userAddress]);

  const handleShowModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full flex justify-center">
      <div className="p-3 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Transaction History</h2>
        {errors && <p className="text-red-500">{errors}</p>}
        <div>
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-2 py-2 border w-2/12 truncate">Transaction Hash</th>
                <th className="px-2 py-2 border w-1/12 truncate">Method</th>
                <th className="px-2 py-2 border w-2/12 truncate">Timestamp</th>
                <th className="px-2 py-2 border w-1/12 truncate">Block</th>
                <th className="px-2 py-2 border w-2/12 truncate">From</th>
                <th className="px-2 py-2 border w-2/12 truncate">To</th>
                <th className="px-2 py-2 border w-1/12 truncate">Value</th>
                <th className="px-2 py-2 border w-1/12 truncate">Status</th>
                <th className="px-2 py-2 border w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.transactionHash}>
                  <td className="px-2 py-2 border truncate" title={tx.transactionHash}>{tx.transactionHash.slice(0, 30)}...</td>
                  <td className="px-2 py-2 border truncate">{tx.method}</td>
                  <td className="px-2 py-2 border truncate">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="px-2 py-2 border truncate" title={tx.block || 'N/A'}>{(tx.block || 'N/A').slice(0, 10)}...</td>
                  <td className="px-2 py-2 border truncate" title={tx.from || 'N/A'}>{(tx.from || 'N/A').slice(0, 24)}...</td>
                  <td className="px-2 py-2 border truncate" title={tx.to || 'N/A'}>{(tx.to || 'N/A').slice(0, 24)}...</td>
                  <td className="px-2 py-2 border truncate">{tx.value}</td>
                  <td className={`px-2 py-2 border truncate ${tx.status === 'Successful' ? 'text-green-500' : 'text-yellow-500'}`}>{tx.status}</td>
                  <td className="px-2 py-2 border text-center">
                    {/* <button className="text-blue-500 hover:text-blue-700" onClick={() => handleShowModal(tx)}>
                      Show Full
                    </button> */}
                    <button onClick={() => handleShowModal(tx)}>
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DetailModal show={showModal} onClose={handleCloseModal} transaction={selectedTransaction} />
    </div>
  );
};

export default TransactionHistory;
