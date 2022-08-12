const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Soundslip = require('../models/Soundslip')

// @desc  Login/Landing page
// @route GET /
router.get('/', ensureGuest, (request, response) => {
  response.render('login', {layout: 'login'})
})

// @desc  Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (request, response) => {
  try{
    const soundslips = await Soundslip.find({user: request.user.id}).lean()
    response.render('dashboard', {
      name: request.user.firstName,
      soundslips
    })
  }catch (err){
    console.error(err)
    response.render('error/500')
  }
})

module.exports = router
