import { useState } from "react";
import { LayoutDashboard, FileText, CircleUserRound } from "lucide-react";
import PropTypes from "prop-types";

const Sidebar = ({ onTabChange }) => {
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
                    className={getTabClassName("create-wallet")}
                    onClick={() => handleTabChange("create-wallet")}
                >
                    <span className="mr-4">
                        <FileText />
                    </span>
                    <span className="flex-grow">Create Wallet</span>
                </li>
                <li
                    className={getTabClassName("send-coin")}
                    onClick={() => handleTabChange("send-coin")}
                >
                    <span className="mr-4">
                        <CircleUserRound />
                    </span>
                    <span className="flex-grow">Send Coin</span>
                </li>
                <li
                    className={getTabClassName("stake")}
                    onClick={() => handleTabChange("stake")}
                >
                    <span className="mr-4">
                        <CircleUserRound />
                    </span>
                    <span className="flex-grow">Stake</span>
                </li>
                <li
                    className={getTabClassName("transaction-history")}
                    onClick={() => handleTabChange("transaction-history")}
                >
                    <span className="mr-4">
                        <CircleUserRound />
                    </span>
                    <span className="flex-grow">Transaction History</span>
                </li>
            </ul>
        </div>
    );
};

Sidebar.propTypes = {
    onTabChange: PropTypes.func.isRequired,
};

export default Sidebar;
