const AccessWallet = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Access Wallet</h1>
          <input
            type="text"
            placeholder="Enter Private Key"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
          />
          <button className="w-full px-4 py-2 mb-4 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors text-lg font-medium">
            Access Wallet
          </button>
          <p className="text-sm text-gray-600">
            Need help? <a href="#" className="text-teal-600 hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    );
  };
  
  export default AccessWallet;
  