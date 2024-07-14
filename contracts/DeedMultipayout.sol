// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DeedMultipayout {
    address public lawyer;
    address payable public beneficiary;
    uint256 public earliest;
    uint256 public amount;
    //gas saving and storing info to code rather than blockchain
    uint256 public constant PAYOUTS = 10;
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
        amount = msg.value / PAYOUTS;
    }

    function withdraw() public {
        require(msg.sender == beneficiary, "Beneficiary only");
        require(block.timestamp >= earliest, "Too early to withdraw");
        //made payouts vs max payouts.
        require(paidPayouts < PAYOUTS);
        //how many payouts should we receive
        uint256 public elligiblePayouts = (block.timestamp - earliest) / INTERVAL;

        //sending everything to the beneficiary
        beneficiary.transfer(address(this).elligiblePayouts * amount);
    }
}
