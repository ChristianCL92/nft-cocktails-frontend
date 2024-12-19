//src/components/CocktailCollection.jsx
import React, { useEffect, useState } from 'react'
import { fetchAllCocktailMetadata } from '../services/nftService'
import { useWallet } from '../hooks/useWallet';
import '../styles/CocktailCollection.css';
import {mintCocktail, mintedNfts} from '../utilities/ContractConfig';


const CocktailCollection = () => {
  const { contract, walletAddress } = useWallet();


    const [cocktails, setCocktails] = useState([]);
    //important for managing slow network requests, shows loading for better user experience
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //Track minting status for each cocktail. So when {"MOJITO": true} means MOJITO is being minted
    const [minting, setMinting] = useState({});
    const [totalMinted, setTotalMinted] = useState(0);

    
    useEffect(() => {
        const initialize = async () => {
            try {
                setLoading(true); 
                const cocktailsData = await fetchAllCocktailMetadata();
                setCocktails(cocktailsData);

                if(contract) {
                  const nftCount = await mintedNfts(contract);
                  setTotalMinted(nftCount);
                }          
            }
            catch(error) {
                console.error("Error initializing", error);
                setError("failed to load cocktails");
                
            } finally {
                setLoading(false);
            }
        }
        initialize();
    }, [contract]);

    const handleMint = async (cocktailName) => {
        if (!walletAddress) {
            alert("Please connect your wallet first");
            return;
        }

        try{
            //Prevents double-minting attempts: 1) (button disabled while minting), 2) show minting state in UI
            setMinting(prev => ({...prev,[cocktailName]: true}));

            const tx = await mintCocktail(contract, cocktailName);
            console.log("handleMint tx", tx);
            await tx.wait();

            const addNftCount = await mintedNfts(contract);
            setTotalMinted(addNftCount);

            alert(`Successfully minted ${cocktailName}`)
        } catch (error) {
            console.log("error minting the nft", error);
            alert("Failed to mint cocktail. Please try again");
        } finally {
            setMinting(prev => ({...prev, [cocktailName]: false}));
        }

    };

     if (loading) {
       return <div className="loading">Loading cocktail collection...</div>;
     }

     if (error) {
       return <div className="error">{error}</div>;
     }

  return (
    <>
      <div className="cocktail-collection">
        <h2 className="cocktail-title">Limited cocktail nfts for minting</h2>
        {/* Smart contract numbers are returned as objects in ethers.js, need toString to convert for reading purposes in react */}
        <p className="total-minted">Total Minted:{totalMinted.toString()}</p>
        <div className="cocktail-grid">
          {cocktails.map((cocktail, index) => (
            <div
              key={index}
              className="cocktail-card"
            >
              <img
                src={cocktail.image}
                alt={cocktail.name}
              />
              <h3>{cocktail.name}</h3>
              <p>{cocktail.description}</p>
              <button
                className={`mint-button ${
                  minting[cocktail.name] ? 'minting' : ''
                }`}
                onClick={() =>
                handleMint(cocktail.name.toUpperCase().replace(/\s+/g, ''))}
                disabled={!walletAddress || minting[cocktail.name]}
              >
                {minting[cocktail.name] ? 'Minting...' : 'Mint NFT'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CocktailCollection;