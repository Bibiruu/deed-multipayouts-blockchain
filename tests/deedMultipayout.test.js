const DeedMultipayout = artifacts.require('DeedMultipayout');

contract('DeedMultipayout', async (accounts) => {
    let deedMultipayout = null;
    before(async () => {
        deedMultipayout = await DeedMultipayout.deployed();
    });

    it('should be able to withdraw for all the payouts (1) in four intervals', async () => {
        const deedMultipayout = await DeedMultipayout.new(
            accounts[1], //lawyer
            accounts[0], //beneficiary
            4, //intervals
            { value: web3.utils.toWei('1', 'ether') }
        );
        // Withdrawing 4 times to exhaust payouts
        for (let i = 0; i < 4; i++) {
            //accounts 1 = beneficiary
            const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
            //timer handling
            await new Promise(resolve => setTimeout(resolve, 1000));
            await deedMultipayout.withdraw({ from: accounts[0] });
            const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
            assert(balanceAfter.sub(balanceBefore).eq(web3.utils.toBN(web3.utils.toWei('0.25', 'ether'))));
        }
    });

    it('should be able to withdraw for all the payouts (2) in two intervals', async () => {
        const deedMultipayout = await DeedMultipayout.new(
            accounts[1],
            accounts[0],
            2, // intervals
            { value: web3.utils.toWei('1', 'ether') }
        );
        try {
            for (let i = 0; i < 2; i++) {
                //accounts 1 = beneficiary
                const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
                //timer handling
                await new Promise(resolve => setTimeout(resolve, 2000));
                await deedMultipayout.withdraw({ from: accounts[0] });
                const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
                assert(balanceAfter.sub(balanceBefore).eq(web3.utils.toBN(web3.utils.toWei('0.5', 'ether'))));
            }
        } catch (e) {
            assert(e.message.includes(e))
        }
        assert(false);
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
            accounts[1], //lawyer
            accounts[0], //beneficiary
            5,
            { value: web3.utils.toWei('1', 'ether') }
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
            accounts[1],
            accounts[0],
            5,
            { value: web3.utils.toWei('1', 'ether') });
        try {
            //5sec = 5000
            await new Promise((resolve => setTimeout(resolve, 5000)))
            await deedMultipayout.withdraw({ from: accounts[1] })
        } catch (e) {
            assert(e.message.includes("Beneficiary only"))
            return;
        }
        assert(false);
    });
});