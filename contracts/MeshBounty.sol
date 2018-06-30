pragma solidity ^0.4.24;

contract MeshBounty {

    address owner;
    enum ServiceBountyStatus {ACTIVE, CLAIMED, CANCELLED, ENDED}
    ServiceBountyStatus bountyStatus;

    struct Contribution {
        address contributor;
        uint amount;
    }

    struct Bounty {
        address creator;
        mapping(address=>uint) contributors;
        uint blockEnd;
        uint bountyBlockStart;
        uint bountyServiceStartBlock;
        uint bountyServiceEndBlock;
    }

    mapping(uint=>Bounty) serviceBounties;


    //EVENTS
    constructor() public {
        owner = msg.sender;
    }


     function getOwner() public view returns(address) { 
        return owner;
    }
    function registerServiceProvider() returns(address){
    }

    // function addServiceBounty(uint bountyAmount, uint _blockStart, uint _blockEnd) public payable returns(uint bountyID){
    //     //create a new service bounty , add it to list
    //     emit ServiceBountyAdded(msg.sender, bountyAmount, _blockStart, _blockEnd);
    //     return bountyId;
    // }

    

}