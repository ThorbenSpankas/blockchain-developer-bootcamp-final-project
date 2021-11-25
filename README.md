# blockchain-developer-bootcamp-final-project
Blockchain Developer Bootcamp 2021 by Consensys


Betting on Eth USD Price. 

With this contract people can place customizable bets on the future price of Eth in USD. 

Someone can place a bet, set the acceptable value of the Counter Bet and make a guess if the price of ETH will exceed a certain threshold in the next x minutes.

During a fixed time period someone can accept that bet and transfer the requested amount to the contract.

At expiration both parties can run a function that resolves the bet for a certain time frame. The winner receives all funds in the contract.
If noone claims the win during the allowed time window, the Eth will become part of the price pool for the next bet.
