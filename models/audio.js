const mongoose = require('mongoose')

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

const Audio = mongoose.model('Audio', audioSchema)

module.exports = Audio;
