import { useState, useEffect } from 'react';
import { connectWallet, getCurrentWalletConnected, walletListener } from '../utilities/ContractConfig';
import '../styles/Header.css';

const Header = () => {
const [walletAddress, setWalletAddress] = useState("");
const [isConnecting, setIsConnecting] = useState(false);

useEffect(() => {
  const initialize = async () => {
    try {
      const { address } = await getCurrentWalletConnected();
      setWalletAddress(address);

      if (address) {
        walletListener(setWalletAddress);
      }
    } catch (error) {
      console.log("error initializing wallet", error);
    }
  };
  initialize();
}, []);

    const handleConnectWallet = async() => {
      if(!window.ethereum) {
         window.open('https://metamask.io/download/', '_blank');       
         return;
      }
      setIsConnecting(true);
      const {address} = await connectWallet();
      setWalletAddress(address);
    
    }


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