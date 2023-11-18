// Helper function to create a hash
function createHash(obj) {
  const jsonString = JSON.stringify(obj);
  return crypto.createHash('sha256').update(jsonString).digest('hex').substring(0, 18);
}


const getAttestationAddressesPerChain = (chainId) => {
  switch (chainId) {
    case 'baseGoerli':
      return {
        infuraPrefix: 'https://base-goerli.infura.io/v3/',
        easContractAddress: "0x4200000000000000000000000000000000000021",
        schemaUID: "0x1763cb2531bc3f0c977303ff252bdc3a00e150c720ac3c30162c8a84483d1b90"
      };
    default:
      throw new Error('Invalid chain')

  }
}
module.exports = {
  createHash,
  getAttestationAddressesPerChain
}
