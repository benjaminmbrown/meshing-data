const MeshBounty = artifacts.require("./MeshBounty.sol");
contract('MeshBounty', (accounts) => {
    let meshBounty;
    let owner = accounts[0];
    let donor = accounts[1];

    beforeEach('set up contract for each test', async () => {
        meshBounty = await MeshBounty.new();
    });

    describe('Creation & Admin', async () => {
        it('should create a contract and set the owner as creator', async()=>{
            assert.equal(await meshBounty.getOwner(), owner)
        })

        it('should allow admin to register new AP/providers', async()=>{
            assert.equal(await meshBounty.registerProvider(donor), donor);
        });

        it('should allow anyone to create service bounty and set them as creator', async()=>{
            assert.equal(true, false);
        });

        it('should hold service bounty rewards in escrow', async()=>{
            assert.equal(true, false);
        });

        it('should allow individuals to contribute to existing service bounties', async()=>{
            assert.equal(true, false);
        });
    });

    describe('Refunds of Uninitiated Service Bounties', async()=>{

        it('should allow service bounty creator to withdraw a refund after bounty end time', async()=>{
            assert.equal(true, false);
        });

        it('should allow contributors to service bounties to withdraw funds (refund) when bounty initiation period ends without a taker', async()=>{
            assert.equal(true, false);
        });
    })

    describe('Claiming Service Bounty', async()=>{
        it('should allow only registered service providers to initiate a bounty claim', async()=>{
            assert.equal(true, false);
        })
    });

    describe('Bounty Being Serviced', async()=>{
        it('should ', async()=>{
            assert.equal(true, false);
        })
    })

    describe('Ending Service Bounty', async()=>{
        it('should release remaining funds in escrow when service bounty time is fulfilled', async()=>{
            assert.equal(true, false);
        });

    });       
})