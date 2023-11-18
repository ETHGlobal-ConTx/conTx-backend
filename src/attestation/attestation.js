const {SchemaRegistry, EAS, SchemaEncoder} = require("@ethereum-attestation-service/eas-sdk");
const {ethers} = require("ethers");
const {getAttestationAddressesPerChain} = require("../utils/utils");

const createNewAttestationRecord = async ({
                                            sender,
                                            txHash,
                                            category,
                                            description,
                                            ipfs,
                                            mediaHash,
                                            attestationChain,
                                          }) => {
  const {infuraPrefix, easContractAddress, schemaUID} = getAttestationAddressesPerChain(attestationChain)
  const eas = new EAS(easContractAddress);
  const provider = new ethers.JsonRpcProvider(`${infuraPrefix}${process.env.INFURA_KEY}`);
  console.log('step 1')

  const privateKey = process.env.ATTESTATION_PK;
  // Signer is an ethers.js Signer instance
  const signer = new ethers.Wallet(privateKey, provider);

// Signer must be an ethers-like signer.
  await eas.connect(signer);
// Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("address Sender,string TransactionHash,string Category,string Description,string IPFS,string MediaHash");

  const data = [
    {name: "Sender", value: sender, type: "address"},
    {name: "TransactionHash", value: txHash || '', type: "string"},
    {name: "Category", value: category || "", type: "string"},
    {name: "Description", value: description || "", type: "string"},
    {name: "IPFS", value: ipfs || "", type: "string"},
    {name: "MediaHash", value: mediaHash || '', type: "string"}
  ]
  console.log('**data**', data)
  const encodedData = schemaEncoder.encodeData(data);


  console.log('Before Attestation')

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000",
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });
  console.log('After Attestation')

  const newAttestationUID = await tx.wait();
  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;

}

const initAttestation = async () => {
  const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000021";
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  console.log('provider: ', ethers)

  // Using Alchemy or Infura as a provider
  const provider = new ethers.JsonRpcProvider(`https://base-goerli.infura.io/v3/${process.env.INFURA_KEY}`);
  console.log('step 1')
  schemaRegistry.connect(provider);
  console.log('step 2')

  const schemaUID = "0x1763cb2531bc3f0c977303ff252bdc3a00e150c720ac3c30162c8a84483d1b90";

  const schemaRecord = await schemaRegistry.getSchema({uid: schemaUID});
  console.log('schemaRecord', schemaRecord);
}

module.exports = {initAttestation, createNewAttestationRecord}
