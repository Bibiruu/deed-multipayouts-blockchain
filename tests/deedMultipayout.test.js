const DeedMultipayout = artifacts.require('DeedMultipayout');

contract('DeedMultipayout', async (accounts) => {
    let deedMultipayout = null;
    before(async () => {
        deedMultipayout = await DeedMultipayout.deployed();
    });

});