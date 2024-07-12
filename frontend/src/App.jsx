import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateWallet from "./pages/CreateWallet";
import AccessWallet from "./pages/AccessWallet";
import Container from "./components/Container";

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
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleWalletCreated = (address) => {
    localStorage.setItem("walletAddress", address);
    console.log("Wallet created with address: ", address);
    setWalletCreated(true);
    setWalletAddress(address);
    navigate("/dashboard");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/create-wallet" element={<CreateWallet onWalletCreated={handleWalletCreated} />} />
      <Route path="/access-wallet" element={<AccessWallet />} />
      <Route path="/dashboard" element={walletCreated ? <Container walletAddress={walletAddress} /> : <Home />} />
    </Routes>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
