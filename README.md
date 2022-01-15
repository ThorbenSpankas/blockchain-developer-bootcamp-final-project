# Blockchain Developer Bootcamp Final Project

## Project description
A little script to place Bets on the future Ethereum USD Price. A bet placer can make a bet if ETH will be higher or equal a set price in the next 2-3 minutes.
The player sets a Bet Amount and how much the counter party has to bet.
When the Bet is placed another player can accept and take the counter bet. This has to be done in 1 minute after the bet was placed.

From 2-3 min after the bet has been placed, the bet can be resolved and the winner receives the price pool.

If a bet has not been taken or resolved, the price pool adds to the next betting round.

## Directory Structure

| Folder        | Contents                                                                          |
|---            |---                                                                                |
| contracts     | Smart contract as deployed on the Rinkeby testnet                                   |
| docs          | Project documentation for deployed address, security and design patterns          |
| frontend      | Front-end client application to interact with the deployed smart contract         |
| migrations    | Migration scripts for deploying the smart contracts in the contracts directory    |
| test          | Unit tests for validating the smart contract                                      |

## Public Ethereum Address for Certification
`0x66f210b57fffb5bC75c5eBBa12C346E891Ca6b8c`

## Dependencies
- dotenv
- web3
- @chainlink/contracts
- truffle/hdwallet-provider

Install dependencies using:<br/>
`npm install`

## Starting the client application
Open the project in VSCode and use the Live Server plugin to open ./frontend/index.html in the browser.

## Running Smart Contract tests
run `truffle test --network rinkeby`

## Deployed Address
https://thorbenspankas.github.io/

## Screencast
https://drive.google.com/drive/folders/1OGbQrxUsydvVbSWeIYC0EaLViYO3BJRt?usp=sharing
