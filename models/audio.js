const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    // not required, as the url is created after
    // audio object is
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  purchaseLink: {
    type: String,
  },
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
