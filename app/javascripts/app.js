import "../stylesheets/app.css";
import 'bootstrap';
import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract'

import demandListing_artifacts from '../../build/contracts/DemandListing.json'
import meshBounty_artifacts from '../../build/contracts/MeshBounty.json'

var DemandListing = contract(demandListing_artifacts);
var MeshBounty = contract(meshBounty_artifacts);

var accounts;
var account;

window.App = {
  start: function () {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MeshBounty.setProvider(web3.currentProvider);
    DemandListing.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      console.log('Accounts:', accounts);
      console.log('Account[0]:', account);
      document.getElementById('currentAccount').innerText = account;
      // App.setStatus('Successfully retrieved Accounts and user account info');


      //init functions
      App.refreshBalance();
      App.watchContractEvents();
    });
  },

  registerNode: function () {
    var inputNode = document.getElementById('inputNodeAddress').value;
    console.log('Registering node:', inputNode);
    MeshBounty.deployed().then(function (instance) {
      return instance.registerServiceProvider(inputNode, {
        from: account
      });
    }).then(function (txResponse) {
      console.log("res", txResponse)
    })
  },

  createServiceRequest: function () {
    var lat = document.getElementById('inputLat').value;
    var lng = document.getElementById('inputLng').value;
    var escrowAmt = document.getElementById('inputEscrow').value;

    
    MeshBounty.deployed().then(function (instance) {
      return instance.createServiceRequest(lat,lng, {value:escrowAmnt, from: account});
    }).then(function (txResponse) {
      console.log("res", txResponse)
    })
  },
  setStatus: function (message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
    alert(message);
  },

  refreshBalance: function () {


  },


  watchContractEvents: function () {
    //any time an event occurs in the token contract, watch and display

    var meshBounty;
    MeshBounty.deployed().then(function (instance) {


      meshBounty = instance;
      //watch all events for this token
      meshBounty.allEvents({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function (error, result) {
        //build out popup
        var alertBox = document.createElement('div');
        alertBox.setAttribute('class', 'alert alert-info alert-dismissable');

        var closeBtn = document.createElement('button');
        closeBtn.setAttribute('type', 'button');
        closeBtn.setAttribute('class', 'close');
        closeBtn.setAttribute('data-dismiss', 'alert');
        closeBtn.innerHTML = '<span>&times;</span>';
        alertBox.appendChild(closeBtn);

        var eventTitle = document.createElement('div');
        eventTitle.innerHTML = '<strong>Event:' + result.event + '</strong>';
        alertBox.appendChild(eventTitle);

        //show arguments
        var argsBox = document.createElement('textarea');
        argsBox.setAttribute('class', 'form-control');
        argsBox.innerText = JSON.stringify(result.args);
        alertBox.appendChild(argsBox);

        //drat to token evens area
        document.getElementById('contractEvents').appendChild(alertBox);

      })
    }).catch(function (e) {
      console.log(e);
      App.setStatus('Error in events', e);
    });

  },
};

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
});