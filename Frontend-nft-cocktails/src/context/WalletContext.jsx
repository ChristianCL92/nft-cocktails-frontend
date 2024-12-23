import { createContext, useState, useEffect } from 'react';
import {
  connectWallet,
  getCurrentWalletConnected,
  walletListener,
} from '../utilities/ContractConfig';

 export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { address, contract } = await getCurrentWalletConnected();
        setWalletAddress(address);
        setContract(contract);

        if (address) {
          walletListener(setWalletAddress);
        }
      } catch (error) {
        console.log('error initializing wallet', error);
      } 
    };
    initialize();
  }, []);

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      const { address, contract } = await connectWallet();
      setWalletAddress(address);
      setContract(contract);
    } catch (error) {
      console.error('Error connecting wallet', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogOut = async() => {
    setWalletAddress("");
    setContract(null);
  }

  const value = {
    walletAddress,
    contract,
    isConnecting,
    handleLogOut,
    handleConnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
        {children}
    </WalletContext.Provider>
  );
};

