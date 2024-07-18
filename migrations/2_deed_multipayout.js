const DeedMultipayout = artifacts.require("DeedMultipayout");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(DeedMultipayout, accounts[0], accounts[1], 1, {value: 100});
};
