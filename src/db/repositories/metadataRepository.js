const Metadata = require('../entities/metadata'); // Ensure this path points to your schema file

/**
 * Creates a new Metadata record if one with the given txHash does not exist.
 * Otherwise, it updates the existing record with the provided fields.
 *
 * @param {Object} metadataFields Fields to be created or updated.
 * @returns {Promise} A promise that resolves with the created/updated document.
 */
function createOrUpdateMetadata(metadataFields) {
  const { txHash } = metadataFields;

  return Metadata.findOneAndUpdate(
    { txHash }, // find a document with matching txHash
    { $set: metadataFields }, // fields to be updated
    {
      new: true, // return the updated document
      upsert: true, // create a new document if one doesn't exist
      runValidators: true, // ensure the update complies with the schema
      setDefaultsOnInsert: true // apply defaults when creating a new document
    }
  ).exec();
}

/**
 * Finds metadata records by an array of transaction hashes.
 *
 * @param {string[]} txHashes - An array of transaction hashes to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of metadata records.
 */
const findMetadatasWithTxHashes = async (txHashes) => {
  try {
    const metadatas = await Metadata.find({ txHash: { $in: txHashes } });
    return metadatas;
  } catch (error) {
    console.error('Error finding metadata records:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

/**
 * Finds a single metadata record by transaction hash.
 *
 * @param {string} txHash - The transaction hash to search for.
 * @returns {Promise<Object|null>} - A promise that resolves to the metadata record or null if not found.
 */
const findMetadataWithTxHash = async (txHash) => {
  try {
    const metadata = await Metadata.findOne({ txHash: txHash });
    return metadata;
  } catch (error) {
    console.error('Error finding metadata record:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

module.exports = { createOrUpdateMetadata, findMetadatasWithTxHashes, findMetadataWithTxHash} ;
