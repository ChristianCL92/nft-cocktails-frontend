//src/components/UserCollection.jsx
import { fetchUserNfts } from "../services/userNftService";
import { useWallet } from '../hooks/useWallet';
import { useState, useEffect } from "react";
import '../styles/UserCollection.css';

const UserCollection = () => {
    const {contract, walletAddress} = useWallet();
    const [userNFTS, setUserNFTS] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getOpenSeaView = (openseaUrl) => {
       window.open(openseaUrl);
       return;
    };

    useEffect(() => {
        const loadUserNFTS = async () => {
            if (!contract || !walletAddress) {
                setUserNFTS([]);
                setLoading(false);
                  return;
            }
           
        try {
            setLoading(true);
            const userCollectionNfts = await fetchUserNfts(contract, walletAddress);
            setUserNFTS(userCollectionNfts);
        } catch (error) {
            console.error("Error loading user NFTs:", error);
            setError("Failed to load your NFT collection. Please try again");
        } finally {
            setLoading(false);
        }
        }
        loadUserNFTS();
    }, [contract, walletAddress]);

      if (!walletAddress) {
        return (
          <div className="user-collection-message">
            Please connect your wallet to view your collection
          </div>
        );
      }

      if (loading) {
        return (
          <div className="user-collection-loading">
            Loading your collection...
          </div>
        );
      }

      if (error) {
        return <div className="user-collection-error">{error}</div>;
      }

  return (
    <>
      <div className="user-collection">
        <h2 className="user-collection-header">Your User Collection</h2>
        {userNFTS.length === 0 ? (
          <p className="collection-empty">
            You haven't minted any cocktail NFTs yet. Start your collection by
            minting!
          </p>
        ) : (
          <div className="user-nft-grid">
            {userNFTS.map((nft) => (
              <div
                key={nft.tokenId}
                className="user-nft-card"
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="nft-image"
                />
                <div className="nft-info">
                  <h3>{nft.name}</h3>
                  <p className="token-id">Token ID: {nft.tokenId.toString()}</p>
                  <button onClick={() => getOpenSeaView(nft.openseaUrl)}>
                    view on opensea
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserCollection