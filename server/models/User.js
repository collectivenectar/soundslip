const mongoose = require('mongoose')

// This setup is for the public profile for users, not implemented yet.
// User management will be a bigger deal with the nextJS version.
// Expanding the schema to include more NFT relevant metadata, like
// packs released, samples downloaded, etc, for social reputation

const UserSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
