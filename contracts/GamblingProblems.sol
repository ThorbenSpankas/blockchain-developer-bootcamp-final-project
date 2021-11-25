pragma solidity >=0.4.22 <0.9.0;

// this contract should allow for unreasonable or reasonable bets
import "priceorakle.sol";

contract GamblingProblem is PriceOrakle {
    

//     Public - Can be accessed by all contracts. 

//    External - Can be accessed externally only. 

  //  Internal -  Contracts within the system and contracts deriving from them can access. 

//    Private -  Can be accessed only by authorized contracts. 


// address

address public bet_put;
address public bet_take;
address public bet_winner;
// TODO work on variables
// Uints
uint public betAmount;
uint public betAmountCounter;
uint public priceGuess;
uint public pricePool;
uint public shareOfPool;
// how do we get this percentage values when we only have integers?
uint public restofPool = 1- shareOfPool;

uint start;

int public price_last_time;
int public price_when_placed;


// Bools
bool internal betActive = false;
bool public letsgo = false;

// Events
event Received(address, uint);


// 
// someone should be able to place a bet with ethereum on whether ethereum usd exchange rate 
// will be equal above or below a certain level in x minutes

    function placeBet(uint _betAmount, uint _betAmountCounter ,uint _priceGuess) external payable returns (uint){
        getLatestPrice();
        // set bet betAmount
        betAmount = _betAmount;
        betAmountCounter = _betAmountCounter;
        // set price you think will happen
        priceGuess = _priceGuess;
        // set a flag for active bet to true
        betActive = true;
        pricePool = betAmount;
        // pay money into the contract for the bet
        // https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/
        // converting to ether because we will only accpet high bets for conevenience (when seeing values in meta mask etc)
        uint conv = 10**18;
        // so we require that the msg value = bet_amount * 10**18
        require(betAmount*conv == msg.value);
        (bool sent, bytes memory data) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        bet_put = msg.sender;
        price_when_placed = getLatestPrice();
        start = block.timestamp;
    }

    function takeBet() external payable {
        // only possible to take bet if bet is placed
        // require bet is placed
        // only possible to take bet until 15 min before resolving
        require(block.timestamp <= start + 1 * 1 minutes);
        require(betActive);


        uint conv = 10**18;
        require(msg.value == betAmountCounter * conv);
        (bool sent, bytes memory data) = payable(address(this)).call{value: betAmountCounter}("");
        require(sent, "Failed to send Ether");
        bet_take = msg.sender;
        pricePool += betAmount;
    }

    function resolveBet() public payable {
         price_now = getLatestPrice();
        // only possible 30 -35 min after bet got placed
        // the money will become part of the next bet if noone claims price
        require(betActive);
        require(block.timestamp <= start + 3 * 1 minutes);
        require(block.timestamp >= start + 2 * 1 minutes);
        
        if(priceGuess >= price_now){
            bet_winner = bet_put;
        } else {
            bet_winner = bet_take;
            }
        // get some if condition here to check which price it is
        // if priceGuess >= truePrice
        // bet_winner = bet_put
        // not_bet_winner = bet_take
        // else the other way around
        
        // some checks to see if person calling is allowed to receive the Ether
        
        // do I want to have two transactions here for both players
        // or are two seperate functions for both prices better?
        
        // where do I want to check who won the bet?
        uint  price = pricePool *10**18;
        (bool sent, bytes memory data) = bet_winner.call{value: price}("");
        require(sent, "Failed to send Ether");
        
       

        
        //price_last_time = getLatestPrice();
    }


// so with this project we can see if I understand

// transfering to contracts and getting money out of them again
// how math works in solidity when floats dont exists (for calculating the payments)
// how to figure out which block is current 
// receive the current quote of an event for a specific block (if this is possible?)
// receive a random number from which the payment share will be determined

// allow contract to get ethernautreceive() external payable {
    receive() external payable {
       emit Received(msg.sender, msg.value);
    }
}