const path = require("path");
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const Rinkeby_URL = process.env.Rinkeby_URL;
var mnemonic = "add phrase here";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    rinkeby: {
        provider: function() { 
         return new HDWalletProvider(mnemonic, "add infura rinkeby link here");
        },
        network_id: 4,
        gas: 4500000,
        gasPrice: 10000000000,
    }
   },
   compilers: {
    solc: {
      version: "^0.8.7"
    }
  }
  };