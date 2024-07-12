import React from 'react';

const WalletDetails = ({ match }) => (
  <div>
    <h1>Wallet Details</h1>
    <p>Details for wallet: {match.params.address}</p>
  </div>
);

export default WalletDetails;
