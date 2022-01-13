// the layout of this frontend has been designed by:
// https://github.com/0xCryptoStefan/blockchain-developer-bootcamp-final-project
// all relevant parts have been taken away or rewritten so it suits the GP Smart Contract 

// Rinkeby instance of contract
const contractAddress = "0x7E9bA7B44902Fc33f9198fD583315587EFC57877"

// Ganache-deployed contract ABI
const contractABI = [
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
// Validate app is loading
console.log("Page loaded as expected.")

// Set core app variables and constants
var web3 = new Web3(window.ethereum)
const smartContractInstance = new web3.eth.Contract(contractABI, contractAddress) // added
smartContractInstance.setProvider(window.ethereum) // added

// 1. Detect whether MetaMask is or is not installed
window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById('mm-detected')
        mmDetected.innerHTML = "MetaMask has been detected!"
    }

    else {
        console.log('No wallet available!')
        this.alert("You need to install MetaMask or another wallet")
    }

    // 2. Allow the user to get access to MetaMask / Connect to MetaMask
    const mmEnable = document.getElementById('mm-connect');

    mmEnable.onclick = async () => {
        await ethereum.request({ method: 'eth_requestAccounts'})

        const mmCurrentAccount = document.getElementById('mm-current-account');
        mmCurrentAccount.innerHTML = "Here's your current account: " + ethereum.selectedAddress
		
		
    }

})

const ssSubmit = document.getElementById('ss-input-button');

ssSubmit.onclick = async () => {
    const BetAmountValue = document.getElementById('BetAmount-input-box').value;
    console.log(BetAmountValue)
	const CounterBetAmountValue = document.getElementById('CounterBetAmount-input-box').value;
    console.log(CounterBetAmountValue)
	const PriceGuessValue = document.getElementById('PriceGuess-input-box').value;
    console.log(PriceGuessValue)

    const smartContractInstance = new web3.eth.Contract(contractABI, contractAddress)

    smartContractInstance.setProvider(window.ethereum)

    let priceGuess = await smartContractInstance.methods.placeBet(BetAmountValue,CounterBetAmountValue,PriceGuessValue)
			.send({from: ethereum.selectedAddress, value: BetAmountValue})
	
	
	const ssDisplayValue = document.getElementById("ss-display-value")
	ssDisplayValue.innerHTML = "we have an active Bet waiting"

    // await smartContract.mint(accounts[0], uri);
}

const ssGetValue = document.getElementById('ss-get-value')

ssGetValue.onclick = async () => {
    console.log("Button has been clicked")
	let counterBetAmount = await smartContractInstance.methods.betAmountCounter().call()
    console.log(counterBetAmount)
    let takingBet = await smartContractInstance.methods.takeBet().send({from: ethereum.selectedAddress, value: counterBetAmount})
    // console.log(takingBet)

    const ssDisplayValue = document.getElementById("ss-display-value")
	ssDisplayValue.innerHTML = "Bet has been taken"

	

}

const ss2GetValue = document.getElementById('ss2-get-value')

ss2GetValue.onclick = async () => {
    console.log("Button has been clicked")
    let tokens = await smartContractInstance.methods.getCurrentPrice().call()
    console.log(tokens)

    const ss2DisplayValue = document.getElementById("ss2-display-value")
	ss2DisplayValue.innerHTML = tokens/100000000

}

const ss3GetValue = document.getElementById('ss3-get-value')


ss3GetValue.onclick = async () => {
    console.log("Button has been clicked")
    let priceGuess = await smartContractInstance.methods.getPriceGuess().call()
    console.log(priceGuess)

    const ss3DisplayValue = document.getElementById("ss3-display-value")
	ss3DisplayValue.innerHTML = priceGuess/10000000

	let BetAmount = await smartContractInstance.methods.getBetAmount().call()
    console.log(BetAmount)

    const ss3_2DisplayValue = document.getElementById("ss3_2-display-value")
	ss3_2DisplayValue.innerHTML = BetAmount

	let CounterBetAmount = await smartContractInstance.methods.getCounterBetAmount().call()
    console.log(CounterBetAmount)

    const ss3_3DisplayValue = document.getElementById("ss3_3-display-value")
	ss3_3DisplayValue.innerHTML = CounterBetAmount

}
const ss4GetValue = document.getElementById('ss4-get-value')
ss4GetValue.onclick = async () => {
    console.log("Button has been clicked")
	//let counterBetAmount = await smartContractInstance.methods.betAmountCounter().call()
    //console.log(counterBetAmount)
    let resolveBet = await smartContractInstance.methods.resolveBet().send({from: ethereum.selectedAddress, value: 0})
    // console.log(takingBet)

    const ss4DisplayValue = document.getElementById("ss4-display-value")
	console.log(resolveBet)
	// would be nice if address of winner is returned
	ss4DisplayValue.innerHTML = "Winner received the money"

}