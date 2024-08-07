const DeedMultipayout = artifacts.require('DeedMultipayout');

contract('DeedMultipayout', async (accounts) => {
    let deedMultipayout = null;
    before(async () => {
        deedMultipayout = await DeedMultipayout.deployed();
    });

    it('should be able to withdraw for all the payouts (1) in four intervals', async () => {
        const deedMultipayout = await DeedMultipayout.new(
            accounts[0],
            accounts[1],
            1,
            { value: 100 }
        );
        // Withdrawing 4 times to exhaust payouts
        for (let i = 0; i < 4; i++) {
            //accounts 1 = beneficiary
            const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            //timer handling
            await new Promise(resolve => setTimeout(resolve, 1000));
            await deedMultipayout.withdraw({ from: accounts[0] });
            const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            assert(balanceAfter.sub(balanceBefore).toNumber() === 25);
        }
    });

    it('should be able to withdraw for all the payouts (2) in two intervals', async () => {
        const deedMultipayout = await DeedMultipayout.new(
            accounts[0],
            accounts[1],
            1,
            { value: 100 }
        );
        for (let i = 0; i < 2; i++) {
            //accounts 1 = beneficiary
            const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            //timer handling
            await new Promise(resolve => setTimeout(resolve, 2000));
            await deedMultipayout.withdraw({ from: accounts[0] });
            const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
            assert(balanceAfter.sub(balanceBefore).toNumber() === 50);
        }
    });

    it('should NOT withdraw if no payouts left', async () => {
        try {
            await deedMultipayout.withdraw({ from: accounts[0] });
        }
        catch (e) {
            assert(e.message.includes("No payouts left"));
            return;
        }
        assert(false);
    });

    it('should NOT withdraw if too early', async () => {
        const deedMultiPayout = await DeedMultipayout.new(
            accounts[0],
            accounts[1],
            5,
            { value: 100 }
        );
        try {
            await deedMultiPayout.withdraw({ from: accounts[0] });
        } catch (e) {
            assert(e.message.includes("Too early to withdraw"));
            return;
        }
        assert(false);
    });

    it('should NOT withdraw if caller is not the lawyer', async () => {
        const deedMultipayout = await DeedMultipayout.new(
            accounts[0],
            accounts[1],
            5,
            { value: 100 });
        try {
            //5sec = 5000
            await new Promise((resolve => setTimeout(resolve, 5000)))
            await deedMultipayout.withdraw({ from: accounts[1] })
        } catch (e) {
            assert(e.message.includes("Lawyer only"))
            return;
        }
        assert(false);
    });
});