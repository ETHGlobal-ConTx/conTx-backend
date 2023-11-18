const { SchemaRegistry } =  require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require("ethers");

const initAttestation = async () => {
  const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  console.log('provider: ',ethers)

  // Using Alchemy or Infura as a provider
  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`);

  schemaRegistry.connect(provider);

  const schemaUID = "0xYourSchemaUID";

  const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });
  console.log(schemaRecord);
}

module.exports = { initAttestation }
