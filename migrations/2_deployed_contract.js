const TimeLockFactory = artifacts.require("LeadTimelock");
const ERC20 = artifacts.require("ERC20");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(ERC20, 'Lead Test', 'LEAD');
  const token = await ERC20.deployed();
  await deployer.deploy(
    TimeLockFactory, token.address, [accounts[1], accounts[2], accounts[3]], 
    [195, 590, 215], 
    [120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200]
    );
};
