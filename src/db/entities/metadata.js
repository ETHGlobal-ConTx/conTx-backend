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
  category: {
    type: String,
    required: true,
    default: 'other'
  },
  mediaHash: {
    type: String,
    required: false // You can omit this line as it's not required by default
  },
  attestationHash: {
    type: String,
    required: false
  },
  deployedOnChain: {
    type: String,
    required: false
  }

});

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = Metadata;
