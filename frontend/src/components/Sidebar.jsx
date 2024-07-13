import { useState } from "react";
import { LayoutDashboard, FileText, Send, Leaf, History, LogOut } from "lucide-react";
import PropTypes from "prop-types";
import Header from "./PaperWallet/Header";

const Sidebar = ({ onTabChange, onLogout }) => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    const getTabClassName = (tab) =>
        `flex items-center cursor-pointer p-2 rounded ${
            activeTab === tab
                ? "text-primary bg-blue-100"
                : "text-gray-800 hover:bg-gray-200"
        }`;

    return (
        <div className="w-1/5 h-screen overflow-y-auto bg-gray-100 p-4 text-gray-900">
            <Header />
            <ul className="space-y-2">
                <li
                    className={getTabClassName("dashboard")}
                    onClick={() => handleTabChange("dashboard")}
                >
                    <span className="mr-4">
                        <LayoutDashboard />
                    </span>
                    <span className="flex-grow">Dashboard</span>
                </li>
                <li
                    className={getTabClassName("send-coin")}
                    onClick={() => handleTabChange("send-coin")}
                >
                    <span className="mr-4">
                        <Send />
                    </span>
                    <span className="flex-grow">Send Coin</span>
                </li>
                <li
                    className={getTabClassName("stake")}
                    onClick={() => handleTabChange("stake")}
                >
                    <span className="mr-4">
                        <Leaf />
                    </span>
                    <span className="flex-grow">Stake</span>
                </li>
                <li
                    className={getTabClassName("pending-transactions")}
                    onClick={() => handleTabChange("pending-transactions")}
                >
                    <span className="mr-4">
                        <FileText />
                    </span>
                    <span className="flex-grow">Pending Transactions</span>
                </li>
                <li
                    className={getTabClassName("transaction-history")}
                    onClick={() => handleTabChange("transaction-history")}
                >
                    <span className="mr-4">
                        <History />
                    </span>
                    <span className="flex-grow">Transaction History</span>
                </li>
                <li
                    className={getTabClassName("logout")}
                    onClick={() => onLogout()}
                >
                    <span className="mr-4">
                        <LogOut />
                    </span>
                    <span className="flex-grow">Logout</span>
                </li>
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    onTabChange: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
