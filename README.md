# deed-multipayouts-blockchain


Contract Setup:

-The constructor sets up the initial state of the DeedMultipayout contract.

*The withdrawal function*
-The withdraw function allows the beneficiary to withdraw the funds in multiple payouts.
-Earliest Withdrawal Check: Ensures that the current time is at least the earliest time set during contract creation, preventing premature withdrawals.
-Payout Limit Check: Ensures that the number of payouts already made (paidPayouts) is less than the maximum number of payouts (PAYOUTS).
-Calculate Eligible Payouts: Calculates how many payouts the beneficiary is eligible to receive based on the elapsed time since earliest. It divides the time difference by the INTERVAL to determine the number of payouts.
-Transfer Funds: Transfers the eligible payout amount to the beneficiary. This is calculated by multiplying the number of eligible payouts by the amount set during the contract creation.


PAYOUTS is 10, INTERVAL is 10 seconds, and the total value sent to the contract is 1 ether.
amount per payout is 1 ether / 10 = 0.1 ether.
earliest is set to 60 seconds after contract creation.


Project takeouts: 

-Smart contract test on remix 
-How to impose time restriction for transfering money with timer. 
-Milestone Tracking: In a contract that involves project milestones, paidPayouts could track completed milestones, ensuring no more than the expected milestones are marked as completed.
-The purpose of withdrawing in 4 or 2 intervals is to simulate and test the contract's functionality for scheduled, periodic payouts. This ensures that the contract correctly handles multiple withdrawals over time, adhering to the specified intervals and payout amounts.  It verifies that the contract enforces the timing constraints and calculates the due payouts accurately. Additionally, these tests help ensure the beneficiary cannot withdraw more than allowed and that the funds are distributed as intended.

*Deployment done in two parts because of network congestion*

Checkout my testnet deployment at Eth Sepolia:

Migrations:
https://sepolia.etherscan.io/tx/0xb95ee99f049d81625a91b785b18a1341ea8423573f18b695c107c52c77aad6dc
DeedMultipayout:
https://sepolia.etherscan.io/tx/0x4a69cb3ae5689462369fdd67f015012aa98b80d0ecb121ee409c9cafb8bc929d