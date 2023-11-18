const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  txHash: {
    type: String,
    required: true
  },
  txChain: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'other'
  },
  attestationHash: {
    type: String,
    required: false
  },
  attestationChain: {
    type: String,
    required: false
  },
  ipfsHash: {
    type: String,
    required: false
  },
  deployedOnChain: {
    type: String,
    required: false
  },
  timestamp: {
    type: Number,
    default: new Date().getTime(),
  }
});

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;
