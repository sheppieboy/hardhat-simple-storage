//imports
const { ethers, run, network } = require('hardhat');
require('dotenv').config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploy contract');

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`Deployed contract to: ${simpleStorage.address}`);

  //what happens when we deploy to hardhat network
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log('Verifying contract...');

  try {
    await run('verify:verify', {
      address: contractAddress,
      contructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
