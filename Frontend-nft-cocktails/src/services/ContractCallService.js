export const mintedNfts = async (contract) => {
  try {
    return await contract.tokenIds();
  } catch (error) {
    console.error('Error trying to access total minted nfts', error);
    throw error;
  }
};

export const mintCocktail = async (contract, cocktailName) => {
  try {
    if (!contract) {
      throw new Error('no contract instance');
    }

    const signer = await contract.runner;
    if (!signer) {
      throw new Error('No signer available');
    }
    const address = await signer.getAddress();
    if (!address) {
      throw new Error('Could not get signer address');
    }

    const tx = await contract.safeMint(address, cocktailName);
    await tx.wait();
    return tx;
  } catch (error) {
    console.error('Could not mint nft', error.message);
    throw error;
  }
};
