/*

This file is based on the tests for SimpleBank.sol from the ConsenSys Blockchain Developer Bootcamp

---
The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/ce47850a8e2cba6ef366625b665c7fba

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
---

*/


// all test will run on rinkeby, an account with enough Test ETH nees to be set up in the truffle config js
const { catchRevert } = require("./exceptionsHelpers.js");
var GP = artifacts.require("./GP.sol");

contract("GP", function (accounts) {
  const [contractOwner, alice] = accounts; 

let smartContract;
let inputAddress;
let contractAddress;
let contractABI;
let smartContractInstance;

  beforeEach(async () => {
    instance = await GP.new();
    smartContract = await GP.deployed();
    inputAddress = await smartContract.address;

    
    contractAddress = inputAddress;

    // ABI
    contractABI = [
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "Received",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "betActive",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "betAmount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "betAmountCounter",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "bet_put",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "bet_take",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "bet_winner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "checkPrice",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getBetAmount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCounterBetAmount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCurrentPrice",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getLatestPrice",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getPriceGuess",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getPricePool",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "not_bet_winner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_betAmount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_betAmountCounter",
					"type": "uint256"
				},
				{
					"internalType": "int256",
					"name": "_priceGuess",
					"type": "int256"
				}
			],
			"name": "placeBet",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "priceGuess",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pricePool",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "price_now",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "resolveBet",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "takeBet",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	]

    smartContractInstance = new web3.eth.Contract(contractABI, contractAddress)

  });


describe("Smart Contract Deployment", async () => {
  it("deploys successfully", async () => {
    const address = await smartContract.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

});



describe("Placing Bet", () => {
  it("can we place a bet?", async () => {
    await smartContractInstance.methods.placeBet(1,1,1).send({from: accounts[0], value: 1}); // place a bet
	await smartContractInstance.methods.takeBet().send({from: accounts[0], value: 1});// take a bet, because of the time restriction it needs to be placed after immediately
    const betAmountCounter = await smartContractInstance.methods.betAmountCounter().call() // get a Value from the bet placed
    assert.equal(betAmountCounter, 1); // check that the value exists
  });
});


describe("Taking Bet", () => {
    it("can we take a bet?", async () => {
		const pricePool = await smartContractInstance.methods.getPricePool().call()// get the PricePool Variable, it is 1 after placing the bet and should be 2 after taking it
		assert.equal(pricePool, 2); // check if price pool increase from taking bet
	  });
	});



describe("Check Price", () => {
    it("current price", async () => {
		const currentPrice = await smartContractInstance.methods.getCurrentPrice().call()// get current price from oracle
		assert.notEqual(currentPrice, 0);// check that its not zero
   		assert.notEqual(currentPrice, ""); // check that its not empty
	  });
	});

describe("Check Price Guess", () => {
	it("current price guess", async () => {
		const priceGuess = await smartContractInstance.methods.getPriceGuess().call()// get price guess of bet placer
		assert.equal(priceGuess, 1); // check if it is 1 as we set when placing the bet
		  });
		});

});