import { ethers } from 'ethers';
import contractABI from '../ContractAbi.json';

// Create provider using ethers v6 syntax
const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;
const provider = new ethers.WebSocketProvider(alchemyKey);

const contractAddress = import.meta.env.VITE_CONTRACT;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Create a new provider and signer with the connected account
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();

      // Create a new contract instance with the signer
      const contractWithSigner = contract.connect(signer); 

      return {
        status: 'Connected successfully',
        address: account,
        contract: contractWithSigner,
      };
    } catch (error) {
      return {
        status: error.message,
        address: '',
        contract: null,
      };
    }
  } else {
    return {
      status: 'Please install MetaMask',
      address: '',
      contract: null,
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        // Create contract instance with signer if account is connected
         const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const contractWithSigner = contract.connect(signer); 

        return {
          status: 'Connected',
          address: accounts[0],
          contract: contractWithSigner,
        };
      }

      return {
        status: 'Please connect wallet',
        address: '',
        contract: null,
      };
    } catch (error) {
      return {
        status: error.message,
        address: '',
        contract: null,
      };
    }
  }

  return {
    status: 'Please install MetaMask',
    address: '',
    contract: null,
  };
};

export const walletListener = async (setWalletAddress, setStatus) => {
  if(window.etherum) {
    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
       
        setWalletAddress(accounts[0]);
        setStatus('Connected');
        return contractWithSigner;
      } else {
        setWalletAddress('');
        setStatus('Please connect wallet');
      }

    });
  }
}




