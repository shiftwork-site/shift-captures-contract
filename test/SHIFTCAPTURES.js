const ANY = "0x4a7D0d9D2EE22BB6EfE1847CfF07Da4C5F2e3f22";
describe("SHIFTCAPTURES", async function () {
  let nftContractFactory;
  let contractDeployed;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async () => {
    [addr1, addr2, addr3] = await ethers.getSigners();
    nftContractFactory = await hre.ethers.getContractFactory('SHIFTCAPTURES');
    contractDeployed = await nftContractFactory.deploy();
    await contractDeployed.deployed(); // Waits for the contract to be deployed successfully
  });
  it("should deploy and create collection and mint successfully", async () => {
    await contractDeployed.createCollection(
      "LINZ", "Ars Electronica", "Lorem Ipsum", true, "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg?width=325", 1988146800000, 1000
    );
    console.log(await contractDeployed.collections(
      1
    ));
    await contractDeployed.createShiftNFT(1, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
    await contractDeployed.createShiftNFT(1, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
    await contractDeployed.createShiftNFT(1, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
    expect(await contractDeployed.tokenMintCount(1)).to.equal("1");
    await contractDeployed.mint(addr1.address, 1, 1);
    await contractDeployed.mint(addr2.address, 1, 1);
    expect(await contractDeployed.tokenIdTracker()).to.equal("3");
    expect(await contractDeployed.tokenMintCount(1)).to.equal("3");

  });

  it("should fail when minting is disabled for collection", async () => {
    await contractDeployed.createCollection(
      "LINZ", "Ars Electronica", "Lorem Ipsum", true, "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg?width=325", 1988146800000, 1000
    );
    await contractDeployed.setMintingEnabled(1, false);

    try {
      await contractDeployed.mintShiftNFT(1, addr2.address, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
      assert.fail("The transaction should have failed but did not.");
    } catch (error) {
      console.error(error);
    }
  });

});


