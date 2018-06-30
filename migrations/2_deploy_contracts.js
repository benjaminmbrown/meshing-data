var DemandListing = artifacts.require("./DemandListing.sol");
var MeshBounty = artifacts.require("./MeshBounty.sol");

var SimpleStorage = artifacts.require("SimpleStorage");
var TutorialToken = artifacts.require("TutorialToken");
var ComplexStorage = artifacts.require("ComplexStorage");

module.exports = function(deployer) {

  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(DemandListing);
  deployer.deploy(MeshBounty);
};
