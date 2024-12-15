import { useState, useEffect } from 'react';
import { connectWallet, getCurrentWalletConnected, walletListener } from '../utilities/ContractConfig';
import '../styles/Header.css';

const Header = () => {
const [walletAddress, setWalletAddress] = useState("");
const [status, setStatus] = useState("");

useEffect(() => {
  const initialize = async () => {
    try {
      const { status, address } = await getCurrentWalletConnected();
      setWalletAddress(address);
      setStatus(status);

      if (address) {
        walletListener(setWalletAddress, setStatus);
      }
    } catch (error) {
      setStatus('Error loading data:', error);
    }
  };
  initialize();
}, []);

    const handleConnectWallet = async() => {
       const connectWalletResponse = await connectWallet();
      const {status, address} = connectWalletResponse;
        setStatus(status);
      setWalletAddress(address);
    
    }


  return (
      <div className="header">
        <h1 className="intro">UniqueCocktailNfts</h1>
        {!walletAddress && (
          <button
            className="walletButton"
            onClick={handleConnectWallet}
          >
            connect wallet
          </button>
        )}
        {walletAddress && ( 
          <p className='walletAddress'>
              Connected: {`${walletAddress.substring(0, 6)}...${walletAddress.slice(-4)}`}
          </p>
        )}
      </div>
  )
}

export default Header