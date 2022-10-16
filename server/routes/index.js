const express = require('express')
const router = express.Router()

const soundslipController = require('../controllers/soundslipController')

// @desc  PRIVATE PROFILE - On loading the user page, finds all files uploaded by user
// @route GET /profile
router.post('/profile', soundslipController.getDashboard)

// @desc LIBRARY - Search or browse the public audio files in the DB.
// @route GET /library
router.get('/library', soundslipController.getPubSoundslips)

module.exports = router
