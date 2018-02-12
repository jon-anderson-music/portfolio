const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo;
