import { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Container = ({ walletAddress, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-full">
      <Sidebar onTabChange={handleTabChange} onLogout={onLogout} />
      <MainContent activeTab={activeTab} walletAddress={walletAddress} />
    </div>
  );
};

export default Container;
