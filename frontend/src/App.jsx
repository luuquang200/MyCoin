import { useState, useEffect } from "react";
import CreateWallet from "./pages/CreateWallet";
import Container from "./components/Container";

const App = () => {
  const [walletCreated, setWalletCreated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      console.log("Wallet found with address: ", savedAddress);
      setWalletCreated(true);
      setWalletAddress(savedAddress);
    }
  }, []);

  const handleWalletCreated = (address) => {
    localStorage.setItem("walletAddress", address);
    console.log("Wallet created with address: ", address);
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
