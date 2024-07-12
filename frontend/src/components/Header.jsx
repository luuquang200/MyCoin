import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <nav className="container mx-auto flex justify-between">
      <div className="font-bold text-xl">MyCoin</div>
      <ul className="flex">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/create-wallet" className="hover:text-gray-300">Create Wallet</Link></li>
        <li><Link to="/send-coin" className="hover:text-gray-300">Send Coin</Link></li>
        <li><Link to="/stake" className="hover:text-gray-300">Stake</Link></li>
        <li><Link to="/transaction-history" className="hover:text-gray-300">Transaction History</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
