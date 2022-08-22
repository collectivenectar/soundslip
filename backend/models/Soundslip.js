const mongoose = require('mongoose')

const SoundslipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    default: false,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // fileURL: {
  //   type: String,
  //   default: '',
  //   required: true
  // }
})

module.exports = mongoose.model('Soundslip', SoundslipSchema)
