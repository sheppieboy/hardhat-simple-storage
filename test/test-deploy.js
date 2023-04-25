const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', function () {
  let simpleStorage, simpleStorageFactory;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it('Should start with a favourite number of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), 0);
  });

  it('Should update when we call store', async () => {
    const expectedValue = 7;
    const transactionResponse = await simpleStorage.store(expectedValue);
    transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue, expectedValue);
  });
});
