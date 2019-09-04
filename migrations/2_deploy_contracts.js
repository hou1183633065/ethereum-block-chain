var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var AlarmUpload = artifacts.require("./AlarmUpload.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(AlarmUpload);
};
