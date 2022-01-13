// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./PriceOrakle.sol";


/// @title Gambling on ETH
/// @author ThorbenSpanka
/// @notice betting wether Ether USD Price is going up or down in the next 2-3 minutes
/// @dev this contract inherits from chainlinks ETHUSD Price Orakle
contract GP is PriceOrakle {
    

//     Public - Can be accessed by all contracts. 

//    External - Can be accessed externally only. 

  //  Internal -  Contracts within the system and contracts deriving from them can access. 

//    Private -  Can be accessed only by authorized contracts. 


// address

address public bet_put;
address public bet_take;
address public bet_winner;
address public not_bet_winner;

// Uints
uint public betAmount;
uint public betAmountCounter;

uint public pricePool;

uint start;

int public checkPrice;
int public price_now;
int public priceGuess;


// Bools
bool public betActive = false;

// Events
event Received(address, uint);


// 
// someone should be able to place a bet with ethereum on wether ethereum eur exchange rate 
// will be equal above or below a certain level in 10 blocks time
    /// @notice Function to place a bet on future ETHUSD Price
    /// @dev This function includes a call to the price oracle from inherited contract. The function is payable.
    /// @param _betAmount How much you want to bet in Wei
    /// @param _betAmountCounter How much the BetTaker should bet
    /// @param _priceGuess betting the future price will be higher equal than the price guess
    ///  that there is an active bet going on for someone to take
    function placeBet(uint _betAmount, uint _betAmountCounter ,int _priceGuess) external payable returns (int){

        betAmount = _betAmount;
        betAmountCounter = _betAmountCounter;
        priceGuess = _priceGuess;
        betActive = true;
        pricePool = betAmount;
        // pay money into the contract for the bet
        // https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/
        
        require(betAmount == msg.value);
        (bool sent, bytes memory data) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        bet_put = msg.sender;
        
        start = block.timestamp;
        return priceGuess;
    }

    /// @notice accept the bet, ideally after looking into the specifics
    /// @dev payable function
    function takeBet() external payable {
        require(betActive);
        require(block.timestamp <= start + 1 * 1 minutes);
        require(msg.value == betAmountCounter);
        (bool sent, bytes memory data) = payable(address(this)).call{value: betAmountCounter}("");
        require(sent, "Failed to send Ether");
        bet_take = msg.sender;
        pricePool += betAmount;
    }

    /// @notice resolving the bet, if this does not happen on time, the Eth will become part 
    /// @notice of next bets price pool. Bet can only be resolved 60 minutes after Bet has been placed
    /// @notice and only until 70 min after it. 
    /// @dev payable function, sending ETH to winner of Bet
    /// returns an address of the bet winner
    function resolveBet() public payable returns (address){
        price_now = getLatestPrice();
        require(block.timestamp <= start + 3 * 1 minutes);
        require(block.timestamp >= start + 2 * 1 minutes);

        if(priceGuess >= price_now){
            bet_winner = bet_put;
        } else {
            bet_winner = bet_take;
            }

        uint  price = pricePool;
        (bool sent, bytes memory data) = bet_winner.call{value: price}("");
        require(sent, "Failed to send Ether");
        return bet_winner;
    }

    /// @notice request current Price from Chainlink oracle.
    /// @return get current price from Chainlink
    function getCurrentPrice() public returns (int) {
        checkPrice = getLatestPrice();
        return checkPrice;
    }

    /// @notice request price guess
    /// @return priceGuess as an int because of compatability with Chainlink
    function getPriceGuess() public returns (int) {
        return priceGuess;
    }

    /// @notice request bet amount
    /// @return uint betAmount
    function getBetAmount() public returns (uint) {
        return betAmount;
    }

    /// @notice request counter bet amount
    /// @return uint betAmountCounter
    function getCounterBetAmount() public returns (uint) {
        return betAmountCounter;
    }

    function getPricePool() public returns (uint) {
        return pricePool;
    }


// allow contract to get eth/tokens
    receive() external payable {
       emit Received(msg.sender, msg.value);
    }
}