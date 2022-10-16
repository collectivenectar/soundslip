const express = require('express')
const router = express.Router()
const soundslipController = require('../controllers/soundslipController')
const awsController = require('../controllers/awsController')

// @desc  LIBRARY - Display all to browse, or search public samples
// @route GET /soundslips/
router.get('/', soundslipController.getPubSoundslips)

// @desc  LIBRARY && PROFILE - Request a play of one audio file if authorized
// @route GET /soundslips/:id
router.get('/:id', awsController.getSoundslipById)

// @desc  UPLOAD++ - On form submit uploads one audio file to AWS and stores AWS key in Mongodb
// @route POST /soundslips/
router.post('/', awsController.actionCreateSoundslip)

// @desc  PRIVATE PROFILE - Edit details for one audio file if authorized
// @route PUT /soundslips/:id
router.put('/:id', soundslipController.actionEditSoundslip)

// @desc  PRIVATE PROFILE - Permanently deletes one audio file if authorized
// @route DELETE /soundslips/:id
router.delete('/:id', awsController.actionDeleteSoundslip)

// @desc  PUBLIC PROFILE - Only partially implemented in both client and server, this is for profile pages
// @route GET /soundslips/user/:userId
router.get('/user/:userName', soundslipController.getPubSoundslipsByUser)


// @desc  PUBLIC && PRIVATE PROFILE - Request a presigned AWS S3 URL to download the audio file - if auth'd
// @route GET /soundslips/download/:slipId
router.get('/download/:slipId', awsController.getDownload)

module.exports = router
