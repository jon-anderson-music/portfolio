const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
  },
  url: {
    type: String,
    required: false,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
