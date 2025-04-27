const ProductRegistry = artifacts.require("ProductRegistry");

module.exports = async function (deployer) {
  await deployer.deploy(ProductRegistry);
};