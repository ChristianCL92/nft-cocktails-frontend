import { fetchCocktailMetadata } from "./nftService";

export const getOpenSeaUrl = (tokenId, contractAddress) => {
    return `https://testnets.opensea.io/assets/sepolia/${contractAddress}/${tokenId}`;
};

export const fetchUserNfts = async (contract, userAddress) => {
    if (!contract || !userAddress) {
        throw new Error("No contract or userAddress in userNftService module");
    }

    try {
        const filter = contract.filters.Minted(userAddress);
        const events = await contract.queryFilter(filter);

        const nftPromises = events.map(async (event) => {
        const {tokenIds, cocktail} = event.args;

        const metadata = await fetchCocktailMetadata(cocktail);
        
        const contractAddress = contract.target;

        return {
            tokenId: tokenIds,
            cocktailName: cocktail,
            openseaUrl:getOpenSeaUrl(tokenIds, contractAddress),
            ...metadata
        }
      
        });

        return await Promise.all(nftPromises)
    } catch (error) {
        console.error("Error fetching user NFTs:", error);
        throw error;
    }
}