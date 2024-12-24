# UniqueCocktailNfts 🍸

A Web3 application that allows users to mint their favorite cocktails as NFTs on  the Ethereum Sepolia testnet. Each NFT is unique with its metadata and image stored via GitHub and viewable on OpenSea.

## Features

- Connect with MetaMast wallet
- Browse a collection of unique cocktail NFTs
- Mint cocktails as NFTs on the Sepolia testnet
- View your minted NFTs in the app
- Integration with OpenSea for viewing NFTs
- Limited minting (max 2 per cocktail per wallet)

## Prerequisities 

Ensure you have installed:

- Node.js
- MetaMask browser extension
- Sepolia tentnet ETH for minting (get from Sepolia Faucet)

## Installation 

1. Clone the repository

- git clone [Repository-url]
- cd frontend-nft-cocktails

2. Install dependencies

- npm install

3. Create a .env file in the root directory with the following variables:

- VITE_ALCHEMY_KEY=your_alchemy_websocket_url
- VITE_CONTRACT=contract_address (0xBAFfEbe1652c2164F3a2Aaaa3dc3DF0974b848b7)


## Contract Features

- ERC721 compliant
- Limited minting per wallet (2 per cocktail)
- Total supply cap 10,000 NFTs
- Metadata stored on GitHub
- OpenZeppelin implementation for security


## Usage Guide

- Ensure you have swiched to Sepolia testnet if not already on it
- Connect your MetaMask wallet using the "Connect Wallet" button
- Browse available cocktail NFTs in the collection
- Click "Mint NFT" on your chosen cocktail
- Confirm the transaction in MetaMask
- View your minted NFTs in "Your User Collection"
- Click "View on OpenSea" to see your NFT on OpenSea


