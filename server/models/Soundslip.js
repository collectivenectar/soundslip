const mongoose = require('mongoose')

// This model is for the metadata of each sample file. The file id for AWS/cloudinary/etc is kept here,
// and used to make the query to request a presigned url to send to the frontend. This isn't the most secure
// path for allowing users to listen but not copy, but I could cache file ids and lower the access time to
// the file bucket.

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
  fileKey: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
}
})

module.exports = mongoose.model('Soundslip', SoundslipSchema)
