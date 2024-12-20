import { fetchCocktailMetadata } from "./nftService";

export const fetchUserNfts = async (contract, userAddress) => {
    if (!contract || !userAddress) {
        throw new Error("No contract or userAddress in userNftService module");
    }

    try {
        const filter = contract.filters.Minted(userAddress);
        const events = await contract.queryFilter(filter);

        const nftPromises = events.map(async (event) => {
            //extracting the parameters from the event (Minted) address in contract. 
            const {tokenIds, cocktail} = event.args;

        const metadata = await fetchCocktailMetadata(cocktail);

        return {
            tokenId: tokenIds,
            cocktailName: cocktail,
            ...metadata
        }
      
        });

        return await Promise.all(nftPromises)
    } catch (error) {
        console.error("Error fetching user NFTs:", error);
        throw error;
    }
}