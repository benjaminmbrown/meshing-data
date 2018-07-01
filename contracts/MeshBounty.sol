pragma solidity ^0.4.24;

contract MeshBounty {

    address owner;
    enum ServiceBountyStatus {ACTIVE, CLAIMED, CANCELLED, ENDED}
    ServiceBountyStatus bountyStatus;

    mapping(uint=>address) public registeredNodes;
    uint public registeredNodesCount;//keep an index

    // struct Contribution {
    //     address contributor;
    //     uint amount;
    // }

    // struct Bounty {
    //     address creator;
    //     mapping(address=>uint) contributors;
    //     uint blockEnd;
    //     uint bountyBlockStart;
    //     uint bountyServiceStartBlock;
    //     uint bountyServiceEndBlock;
    // }


   //mapping(uint=>Bounty) serviceBounties;

    struct ServiceRequest {
        address creator;
        uint balanceInEscrow;
        address provider;
        bytes32 lat;
        bytes32 lng;
    }

    mapping(uint => ServiceRequest) public serviceRequests;
    uint public serviceRequestCount;

    //EVENTS
    constructor() public {
        owner = msg.sender;
    }


     function getOwner() public view returns(address) { 
        return owner;
    }

    event ServiceProviderAdded(address indexed _addr);

    function registerServiceProvider(address _addr) external returns(address){
        registeredNodes[registeredNodesCount] = _addr;
        registeredNodesCount++;
        emit ServiceProviderAdded(_addr);
        return _addr;
    }

    event ServiceRequestAdded(address _addre, uint amount, bytes32 lat, bytes32 lng);

    function createServiceRequest (bytes32 _lat, bytes32 _lon ) public payable returns (uint serviceId){
        serviceRequestCount++;
        serviceRequests[serviceRequestCount] = ServiceRequest({
            creator: msg.sender,
            balanceInEscrow: msg.value,
            lat: _lat,
            lng: _lng
        })
        emit ServiceRequestAdded(msg.sender,amount,lat,lng)
    }
    
    function getNumberServiceRequests() public view returns (uint count){
        return serviceRequestCount
    }

    function getNumberServiceProviders() public view returns (uint count){
        return registeredNodesCount;
    }
}