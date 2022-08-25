const express = require('express')
const router = express.Router()
const soundslipController = require('../controllers/soundslipController')

const Soundslip = require('../models/Soundslip')

// @desc  Process add form
// @route POST /soundslips/
router.post('/', soundslipController.actionCreateSoundslip)

// @desc  Show all public soundslips (library feature)
// @route GET /soundslips/
router.get('/', soundslipController.getPubSoundslips)

// @desc Show single soundslip (maybe for link sharing? not sure, at least useful for edits)
// @route GET /soundslips/:id
router.get('/:id',soundslipController.getSoundslipById)

// @desc  Update soundslip
// @route PUT /soundslips/:id
router.put('/:id', soundslipController.actionEditSoundslip)

// @desc  Delete soundslip
// @route DELETE /soundslips/:id
// router.delete('/:id', soundslipController.actionDeleteSoundslip)

// @desc  Get User soundslips
// @route GET /soundslips/user/:userId
router.get('/user/:userName', soundslipController.getPubSoundslipsByUser)

module.exports = router
