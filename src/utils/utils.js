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
        schemaUID: "0x4dc1609b439db1b2d52c83ca334adf8837da74294d66dd967a7f8d0f79b07b95"
      };
    default:
      throw new Error('Invalid chain')

  }
}
module.exports = {
  createHash,
  getAttestationAddressesPerChain
}
