import PaperWallet from "../components/PaperWallet/PaperWallet";

const Dashboard = ({ walletAddress }) => {
    return (
        <div className="centered-container">
            <div className="flex justify-center items-center h-screen">
                <PaperWallet walletAddress={walletAddress} />
            </div>
        </div>
    );
};

export default Dashboard;