const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "display miss stone bounce rail double entire erosion hello drift expose boss";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    rinkeby: {
        provider: function() { 
         return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/e7511ae4f6514aa78ae45f7b88ce4aaf");
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