const DeedMultipayout = artifacts.require("DeedMultipayout");

module.exports = function (deployer, _network, accounts) {
  const beneficiary = accounts[0]; // The sender from MetaMask
  const lawyer = accounts[1];
  const fromNow = 10;
  deployer.deploy(DeedMultipayout, beneficiary, lawyer, fromNow, {
    value: web3.utils.toWei('1', 'ether')
  });
};
