var DemandListing = artifacts.require("./DemandListing.sol");
var MeshBounty = artifacts.require("./MeshBounty.sol");
module.exports = function(deployer) {
  deployer.deploy(DemandListing);
  deployer.deploy(MeshBounty);
};
