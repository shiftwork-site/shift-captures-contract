const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('SHIFTCAPTURES');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  await nftContract.setDeveloper("0x4a7D0d9D2EE22BB6EfE1847CfF07Da4C5F2e3f22");

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