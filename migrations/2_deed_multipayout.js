const DeedMultipayout = artifacts.require("DeedMultipayout");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(DeedMultipayout, accounts);
};
s