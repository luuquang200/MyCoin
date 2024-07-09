import PropTypes from 'prop-types';
import Dashboard from '../pages/Dashboard';
import CreateWallet from '../pages/CreateWallet';
import SendCoin from '../pages/SendCoin';
import Stake from '../pages/Stake';
import TransactionHistory from '../pages/TransactionHistory';

const MainContent = ({ activeTab }) => {
    return (
        <div className="w-4/5 h-screen">
            {activeTab === 'dashboard' && <Dashboard walletAddress={MainContent.propTypes.walletAddress} />}
            {activeTab === 'create-wallet' && <CreateWallet />}
            {activeTab === 'send-coin' && <SendCoin />}
            {activeTab === 'stake' && <Stake />}
            {activeTab === 'transaction-history' && <TransactionHistory />}
        </div>
    );
};

MainContent.propTypes = {
    activeTab: PropTypes.string.isRequired,
    walletAddress: PropTypes.string.isRequired,
};
  
export default MainContent;
