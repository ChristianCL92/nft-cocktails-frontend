//src/components/CocktailCollection.jsx
import React, { useEffect, useState } from 'react'
import { fetchAllCocktailMetadata } from '../services/nftService'
import '../styles/CocktailCollection.css';


const CocktailCollection = () => {
    const [cocktails, setCocktails] = useState([]);
    //important for handling slow network requests, shows loading for better user experience
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadCocktails = async () => {
            try {
                setLoading(true); 
                const cocktailsData = await fetchAllCocktailMetadata();
            
                setCocktails(cocktailsData);
                
            }
            catch(error) {
                setError("failed to load cocktails");
                console.error("Cannot complete fetching all cocktails", error);
                
            } finally {
                setLoading(false);
            }
        }
        loadCocktails();
    }, []);

     if (loading) {
       return <div className="loading">Loading cocktail collection...</div>;
     }

     if (error) {
       return <div className="error">{error}</div>;
     }

  return (
   <>
   <div className='cocktail-collection'>
    <h2 className='cocktail-title'>Mint your own NFT</h2>
    <div className='cocktail-grid'>
        {cocktails.map((cocktail, index) => (
            <div key={index}
            className='cocktail-card'>
                <img src={cocktail.image} alt={cocktail.name}/>
                <h3>{cocktail.name}</h3>
                <p>{cocktail.description}</p>
                <button className='mint-button'>Mint as Nft</button>
            </div>
        ) 
        )}
    </div>
   </div>
   </>
  )
}

export default CocktailCollection;