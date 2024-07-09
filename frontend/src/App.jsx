import { useState } from "react";
import CreateWallet from "./pages/CreateWallet";
import Container from "./components/Container";

const App = () => {
  const [walletCreated, setWalletCreated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleWalletCreated = (address) => {
    setWalletCreated(true);
    setWalletAddress(address);
  };

  return (
    <div className="App">
      {!walletCreated ? (
        <CreateWallet onWalletCreated={handleWalletCreated} />
      ) : (
        <Container walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default App;
