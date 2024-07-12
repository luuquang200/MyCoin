import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import CreateWallet from "./pages/CreateWallet";
import AccessWallet from "./pages/AccessWallet";
import Container from "./components/Container";
import Home from "./pages/Home";  

const App = () => {
  const [walletCreated, setWalletCreated] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      console.log("Wallet found with address: ", savedAddress);
      setWalletCreated(true);
      setWalletAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (walletCreated) {
      navigate("/dashboard");
    }
  }, [walletCreated, navigate]);

  const handleWalletCreated = (address) => {
    localStorage.setItem("walletAddress", address);
    console.log("Wallet created with address: ", address);
    setWalletCreated(true);
    setWalletAddress(address);
  };

  const handleWalletAccessed = (address) => {
    localStorage.setItem("walletAddress", address);
    console.log("Wallet accessed with address: ", address);
    setWalletCreated(true);
    setWalletAddress(address);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-wallet" element={<CreateWallet onWalletCreated={handleWalletCreated} />} />
        <Route path="/access-wallet" element={<AccessWallet onWalletAccessed={handleWalletAccessed} />} />
        <Route path="/dashboard" element={walletCreated ? <Container walletAddress={walletAddress} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
