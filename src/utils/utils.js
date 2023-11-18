const FormData = require('form-data');
const Axios = require('axios');
const fs = require('fs');

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
    case 'arbGoerli':
      return {
        infuraPrefix: 'https://arbitrum-goerli.infura.io/v3/',
        easContractAddress: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
        schemaUID: "0x4dc1609b439db1b2d52c83ca334adf8837da74294d66dd967a7f8d0f79b07b95"
      };
    case 'lineaGoerli':
      return {
        infuraPrefix: 'https://linea-goerli.infura.io/v3/',
        easContractAddress: "0xaEF4103A04090071165F78D45D83A0C0782c2B2a",
        schemaUID: "0x4dc1609b439db1b2d52c83ca334adf8837da74294d66dd967a7f8d0f79b07b95"
      };
    default:
      throw new Error('Invalid chain')

  }


}

const pinFile = (filePath) => {
  console.log('pinFile() filePath ', filePath)

  // Check if the file exists and is readable
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist');
  }
  console.log('pinFile(), file exists')
  const createReadStream =  fs.createReadStream(filePath); // Corrected to use the file path
  const data = new FormData();
  data.append('file', createReadStream);
  return Axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
    maxContentLength: Infinity, // Needed to prevent Axios from throwing error with large files
    headers: {
      ...data.getHeaders(), // Appends the necessary Content-Type header with the boundary
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
  });
};


module.exports = {
  createHash,
  getAttestationAddressesPerChain,
  pinFile
}
