const express = require('express')
const router = express.Router()
const soundslipController = require('../controllers/soundslipController')
const awsController = require('../controllers/awsController')

// @desc  Process add form
// @route POST /soundslips/
router.post('/', awsController.actionCreateSoundslip)

// @desc  Show all public soundslips (library feature)
// @route GET /soundslips/
router.get('/', soundslipController.getPubSoundslips)

// @desc Show single soundslip (maybe for link sharing? not sure, at least useful for edits)
// @route GET /soundslips/:id
router.get('/:id', awsController.getSoundslipById)

// @desc Provide a presigned url for downloading the sound file as an attachment
// @route GET /soundslips/:id/:userId
router.get('/:userId/:id', awsController.downloadSoundslip)

// @desc  Update soundslip
// @route PUT /soundslips/:id
router.put('/:id', soundslipController.actionEditSoundslip)

// @desc  Delete soundslip
// @route DELETE /soundslips/:id
router.delete('/:id', awsController.actionDeleteSoundslip)

// @desc  Get User soundslips
// @route GET /soundslips/user/:userId
router.get('/user/:userName', soundslipController.getPubSoundslipsByUser)

module.exports = router
