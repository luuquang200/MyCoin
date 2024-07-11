import PaperWallet from "../components/PaperWallet/PaperWallet";

const Dashboard = ({ walletAddress }) => {
    return (
        <div className="centered-container">
            <div className="flex justify-center items-center h-screen  bg-gradient-to-r from-blue-100 to-purple-100">
                <PaperWallet walletAddress={walletAddress} />
            </div>
        </div>
    );
};

export default Dashboard;