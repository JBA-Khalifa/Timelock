const { expectRevert, time } = require('@openzeppelin/test-helpers');
const LeadTimelock = artifacts.require('LeadTimelock');
const ERC20 = artifacts.require('ERC20');

contract('LeadTimelock', (accounts) => {
    let timelock;
    const [beneficiary1, beneficiary2, beneficiary3] = [accounts[1], accounts[2], accounts[3]];
  
    before(async () => {
        erc20 = await ERC20.deployed();
        timelock = await LeadTimelock.deployed();
        await erc20.transfer(timelock.address, 510000000);
    });

    it('Should have transferred balance of 510000000 tokens', async () => {
        const balance = await erc20.balanceOf(timelock.address);
        assert.equal(balance, 510000000);
    });

    it('Should have equal number of beneficiaries and percentages', async () => {
        const length = await timelock.beneficiaries;
        for(i = 0; i < length.length; i++) {
            const beneficiary = await timelock.beneficiaries.call('i');
            const percent = await timelock.scheduleList.call('i');
            assert.equal(beneficiary.length, percent.length);
        }
    });

    it('Should NOT distribute payments before time', async () => {
        await expectRevert(
            timelock.distributePayment(),
            'Realease time not reached'
        );
    });

    it('Should distribute appropriate allocations on every payout', async () => {
        //first period
        await time.increase(120);
        await timelock.distributePayment();
        let balance1 = await erc20.balanceOf(beneficiary1);
        let balance2 = await erc20.balanceOf(beneficiary2);
        let balance3 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance1.toNumber(), 9945000);
        assert.equal(balance2.toNumber(), 30090000);
        assert.equal(balance3.toNumber(), 10965000);

        //second period
        await time.increase(120);
        await timelock.distributePayment();
        let balance11 = await erc20.balanceOf(beneficiary1);
        let balance22 = await erc20.balanceOf(beneficiary2);
        let balance33 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance11.toNumber(), 19890000);
        assert.equal(balance22.toNumber(), 60180000);
        assert.equal(balance33.toNumber(), 21930000);
        
        //third period
        await time.increase(120);
        await timelock.distributePayment({
            require(b > 0);
            c = a / b;
        });
        let balance111 = await erc20.balanceOf(beneficiary1);
        let balance222 = await erc20.balanceOf(beneficiary2);
        let balance333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance111.toNumber(), 29835000);
        assert.equal(balance222.toNumber(), 90270000);
        assert.equal(balance333.toNumber(), 32895000);

        //fourth period
        await time.increase(120);
        await timelock.distributePayment();
        let balance1111 = await erc20.balanceOf(beneficiary1);
        let balance2222 = await erc20.balanceOf(beneficiary2);
        let balance3333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance1111.toNumber(), 39780000);
        assert.equal(balance2222.toNumber(), 120360000);
        assert.equal(balance3333.toNumber(), 43860000);

        //fifth period
        await time.increase(120);
        await timelock.distributePayment();
        let balance11111 = await erc20.balanceOf(beneficiary1);
        let balance22222 = await erc20.balanceOf(beneficiary2);
        let balance33333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance11111.toNumber(), 49725000);
        assert.equal(balance22222.toNumber(), 150450000);
        assert.equal(balance33333.toNumber(), 54825000);

        //sixth period
        await time.increase(120);
        await timelock.distributePayment();
        let balance111111 = await erc20.balanceOf(beneficiary1);
        let balance222222 = await erc20.balanceOf(beneficiary2);
        let balance333333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance111111.toNumber(), 59670000);
        assert.equal(balance222222.toNumber(), 180540000);
        assert.equal(balance333333.toNumber(), 65790000);

        //seventh period
        await time.increase(120);
        await timelock.distributePayment();
        let balance1111111 = await erc20.balanceOf(beneficiary1);
        let balance2222222 = await erc20.balanceOf(beneficiary2);
        let balance3333333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance1111111.toNumber(), 69615000);
        assert.equal(balance2222222.toNumber(), 210630000);
        assert.equal(balance3333333.toNumber(), 76755000);

        //eight period
        await time.increase(120);
        await timelock.distributePayment();
        let balance11111111 = await erc20.balanceOf(beneficiary1);
        let balance22222222 = await erc20.balanceOf(beneficiary2);
        let balance33333333 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance11111111.toNumber(), 79560000);
        assert.equal(balance22222222.toNumber(), 240720000);
        assert.equal(balance33333333.toNumber(), 87720000);

        //ninth period
        await time.increase(120);
        await timelock.distributePayment();
        let balance9 = await erc20.balanceOf(beneficiary1);
        let balance99 = await erc20.balanceOf(beneficiary2);
        let balance999 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance9.toNumber(), 89505000);
        assert.equal(balance99.toNumber(), 270810000);
        assert.equal(balance999.toNumber(), 98685000);

        //tenth period
        await time.increase(120);
        await timelock.distributePayment();
        let balance110 = await erc20.balanceOf(beneficiary1);
        let balance220 = await erc20.balanceOf(beneficiary2);
        let balance330 = await erc20.balanceOf(beneficiary3);
        assert.equal(balance110.toNumber(), 99450000);
        assert.equal(balance220.toNumber(), 300900000);
        assert.equal(balance330.toNumber(), 109650000);
    });

});