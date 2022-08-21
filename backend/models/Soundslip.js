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
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // },
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