//src/utilities/ContractConfig.js
import { ethers } from 'ethers';
import contractABI from '../ContractAbi.json';

const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;
const provider = new ethers.WebSocketProvider(alchemyKey);

const contractAddress = import.meta.env.VITE_CONTRACT;
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await browserProvider.getSigner();

      const contractWithSigner = contract.connect(signer); 
  
      return {
        address: accounts[0],
        contract: contractWithSigner,
      };
    } catch (error) {
      console.log("Error connecting wallet", error);
      throw error;
    }
  } 
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts.length > 0) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const contractWithSigner = contract.connect(signer); 

        return {
          address: accounts[0],
          contract: contractWithSigner,
        };
      }

      return {
        address: '',
        contract: null,
      };
    } catch (error) {
      console.log("Error getting wallet connection:", error);
      return {
        address: '',
        contract: null,
      };
    }
  }
};

export const walletListener = async (setWalletAddress) => {
  if(window.ethereum) {
    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress('');
      }
    });
  }
}


 

