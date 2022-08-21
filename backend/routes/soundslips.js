const express = require('express')
const router = express.Router()
const soundslipController = require('../controllers/soundslipController')

const Soundslip = require('../models/Soundslip')

// @desc  Process add form
// @route POST /soundslips/
router.post('/', soundslipController.actionCreateSoundslip)

// @desc  Show all soundslips
// @route GET /soundslips/
router.get('/',soundslipController.getPubSoundslips)

// @desc Show single soundslip
// @route GET /soundslips/:id
router.get('/:id',soundslipController.getSoundslipById)

// @desc  Show edit page
// @route GET /soundslips/edit/:id
router.get('/edit/:id', soundslipController.editSoundslipForm)

// @desc  Update soundslip
// @route PUT /soundslips/:id
// router.put('/:id', soundslipController.actionEditSoundslip)

// @desc  Delete soundslip
// @route DELETE /soundslips/:id
// router.delete('/:id', soundslipController.actionDeleteSoundslip)

// @desc  Get User soundslips
// @route GET /soundslips/user/:userId
// router.get('/user/:userId', soundslipController.getPubSoundslipsByUser)

module.exports = router
