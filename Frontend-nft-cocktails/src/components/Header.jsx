//src/components/Header.jsx
import '../styles/Header.css';
import { useWallet } from '../hooks/useWallet';

const Header = () => {
const {walletAddress, isConnecting, handleConnectWallet } = useWallet();

  return (
    <div className="header">
      <h1 className="title">UniqueCocktailNfts</h1>
      <div className="wallet-section">
        {!window.ethereum ? (
          <button
            className="walletButton"
            onClick={handleConnectWallet}
          >
            Install MetaMask
          </button>
        ) : !walletAddress ? (
          <button
            className="walletButton"
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <p className="walletAddress">
            Connected:{' '}
            {`${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default Header