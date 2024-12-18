//src/utilities/ContractConfig.js
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
        address: account,
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
        // Create contract instance with signer if account is connected
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
  if(window.etherum) {
    // Callback function needed for metamask account change event. 
    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      } else {
        setWalletAddress('');
      }
    });
  }
}

export const mintedNfts = async (contract) => {
 try{
  return await contract.tokenIds(); 
 }catch(error){
  console.error("Error trying to access total minted nfts", error);
  throw error
 }
}

 export const mintCocktail = async (contract, cocktailName) => {
  try {
    if (!contract) {
      throw new Error("no contract instance");
    }

    console.log("Contract instance", contract);

    const tx = await contract.safeMint(contract.signer.getAddress(), cocktailName);
    console.log("Transaction initialized", tx);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error("Could not mint nft", error.message);
    throw error;
  }

};
 

