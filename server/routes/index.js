const express = require('express')
const router = express.Router()

const soundslipController = require('../controllers/soundslipController')

// @desc  Dashboard
// @route GET /profile
router.post('/profile', soundslipController.getDashboard)

// @desc Library (search)
// @route GET /library
router.get('/library', soundslipController.getPubSoundslips)

module.exports = router
