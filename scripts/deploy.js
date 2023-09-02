const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('SHIFTCAPTURES');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  // await nftContract.transferOwnership("0x9ba4ae5378202F80a2961faAd907759443C60122");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();