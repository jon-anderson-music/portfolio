const mongoose = require('mongoose');

const bodySchema = new mongoose.Schema({
  paragraph: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Body = mongoose.model('Body', bodySchema);

module.exports = Body;