// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DeedMultipayout {
    address public lawyer;
    address payable public beneficiary;
    uint256 public earliest;
    uint256 public amount;
    //gas saving and storing info to code rather than blockchain
    uint256 public constant MAXPAYOUTS = 10;
    uint256 public constant INTERVAL = 10;
    uint256 public paidPayouts;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint256 fromNow
    ) payable {
        //argument same as the money sent
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = block.timestamp + fromNow;
        amount = msg.value / MAXPAYOUTS;
    }

    function withdraw() public {
        require(msg.sender == beneficiary, "Beneficiary only");
        //preventing premature withdrawals
        require(block.timestamp >= earliest, "Too early to withdraw");
        //made payouts vs max payouts.
        require(paidPayouts < MAXPAYOUTS, "No payouts left");
        //how many payouts should we receive ex. 10 seconds / 10 seconds per interval = 1 payout
        uint256 elligiblePayouts = (block.timestamp - earliest) / INTERVAL;
        //example calculation: duepayout 1 = 3-2
        uint256 duePayouts = elligiblePayouts - paidPayouts;
        //making sure the transaction matches the amount 
        duePayouts = duePayouts + paidPayouts > MAXPAYOUTS
            ? MAXPAYOUTS - paidPayouts
            : duePayouts;
        //incrementing payouts
        paidPayouts += duePayouts;
        //sending everything to the beneficiary
        beneficiary.transfer(duePayouts * amount);
    }
}
