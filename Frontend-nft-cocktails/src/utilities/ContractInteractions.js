const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const {createAlchemyWeb3} = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("..ContractAbi.json/");
const contractAddress = process.env.REACT_APP_CONTRACT;

const uniqueNftCocktails = new web3.eth.Contract(contractABI, contractAddress);

