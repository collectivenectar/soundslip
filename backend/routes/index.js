const express = require('express')
const router = express.Router()
const soundslipController = require('../controllers/soundslipController')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


// @desc  Login/Landing page
// @route GET /
router.get('/', (request, response) => {
  response.status(200).json({mssg: "request to login"})
})

// @desc  Dashboard
// @route GET /dashboard
// add ensureAuth after route
// router.get('/dashboard', soundslipController.getDashboard)

// @desc Library (search)
// @route GET /library
// add ensureAuth after route
router.get('/library', soundslipController.getPubSoundslips)

module.exports = router
