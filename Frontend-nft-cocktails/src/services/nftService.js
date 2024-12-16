//src/services/nftService.js
const GITHUB_BASE_URL ='https://raw.githubusercontent.com/ChristianCL92/theNftCocktails/main/metadata/Cocktails/';

const AVAILABLE_COCKTAIL_NFTS = [
    "WHITERUSSIAN",
    "AMARETTOSOUR",
    "BRANDYALEXANDER",
    "COSMOPOLITAN",
    "DAIQUIRI",
    "MANHATTAN",
    "MOJITO",
    "PINACOLADA",
    "TEQUILASUNRISE",
    "TOMCOLLINS"
];
// Better code organisation to spread out the fetch in two functions because it provides a clear error handling per cocktail
export const fetchCocktailMetadata = async (cocktailName) => { 
    try {
        const response = await fetch(`${GITHUB_BASE_URL}${cocktailName}.json`);
        if(!response.ok) {
            throw new Error(`Could not fetch cocktail nft metadata for ${cocktailName}`);
        }
        return await response.json();
    } catch (error) {
        console.log("Error fetching cocktail nft metadata", error);
        throw error;
    }
};

export const fetchAllCocktailMetadata = async () => { 
    try {
        const cocktailNfts = AVAILABLE_COCKTAIL_NFTS.map((cocktailName) =>
          fetchCocktailMetadata(cocktailName)
        );
        return await Promise.all(cocktailNfts);
    } catch (error) {
        console.log("Error fetching available cocktail nfts", error);
        throw error;
    } 
};

