import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-6 text-teal-600">FIT Wallet</h1>
      <p className="text-2xl mb-12 text-center px-4">
        The most reputable, friendly, and secure crypto wallet.
      </p>
      <div className="flex space-x-4">
        <Link to="/create-wallet">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium">
            Create a New Wallet
          </button>
        </Link>
        <Link to="/access-wallet">
          <button className="px-6 py-3 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-lg font-medium">
            Access My Wallet
          </button>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full py-4 bg-gray-900 text-white text-center">
        <p>&copy; 2024 FIT Wallet. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
