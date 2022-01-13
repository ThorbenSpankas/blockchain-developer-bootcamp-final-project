var GP = artifacts.require("GP")
module.exports = function(deployer,network,accounts) {
  deployer.deploy(GP, {from: accounts[0]});
};
