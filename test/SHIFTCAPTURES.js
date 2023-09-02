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
      "LINZ", "Ars Electronica", true, 1988146800000, 1000, "PLACE"
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
      "LINZ", "Ars Electronica", true, 1988146800000, 1000, "PLACE"
    );
    await contractDeployed.setMintingEnabled(1, false);

    try {
      await contractDeployed.createShiftNFT(1, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
      assert.fail("The transaction should have failed but did not.");
    } catch (error) {
      console.error(error);
    }
  });

  it("should change tokenUri", async () => {
    await contractDeployed.createCollection(
      "LINZ", "Ars Electronica", true, 1988146800000, 1000, "PLACE"
    );
    await contractDeployed.createShiftNFT(1, "https://jsonplaceholder.typicode.com/todos/1", "0x61a5A64861c839f8F4D9fAA1F6b6F06052BA1C1B");
    await contractDeployed.setTokenURI(1, "https://bla");
    expect(await contractDeployed.uri(1)).to.equal("https://bla");

  });

  it("should transfer Ownership By Owner", async () => {
    await contractDeployed.createCollection(
      "LINZ", "Ars Electronica", true, 1988146800000, 1000, "PLACE"
    );
    await contractDeployed.transferOwnership(addr3.address);
    expect(await contractDeployed.owner()).to.equal(addr3.address);

  });

  it("Should fail if collection closing date has expired", async function () {
    // Setting a past closing date for the collection
    await contractDeployed.createCollection(
      "LINZ", "Ars Electronica", true,
      946681200000, // 01 Jan 2000
      1000, "PLACE"
    );

    await contractDeployed.createShiftNFT(
      1,
      "ipfs://testURI",
      addr2.address
    );

    // Attempt to mint should fail because the collection's closing date has expired
    await expect(contractDeployed.connect(addr1).mint(addr1.address, 1, 1)).to.be.revertedWith("You're too late. Minting for this collection expired.");
  });
});


