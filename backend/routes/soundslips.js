const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Soundslip = require('../models/Soundslip')

// @desc  Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (request, response) => {
  response.render('soundslips/add')
})

// @desc  Process add form
// @route POST /stories/
router.post('/', ensureAuth, async (request, response) => {
  try{
    request.body.user = request.user.id
    await Soundslip.create(request.body)
    response.redirect('/dashboard')
  }catch(err){
    console.error(err)
    response.render('error/500')
  }
})

// @desc  Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (request, response) => {
  try{
    const soundslips = await Soundslip.find({status: 'public'})
      .populate('user')
      .sort({createdAt: 'desc'})
      .lean()
    response.render('soundslips/index', {
      soundslips,
    })
  }catch (err){
    console.error(err)
    response.error('error/500')
  }
})

// @desc Show single story
// @route GET /stories/:id
router.get('/:id', ensureAuth, async (request, response) => {
  try{
    let soundslip = await Soundslip.findById(request.params.id)
      .populate('user')
      .lean()
    if(!soundslip){
      return response.render('error/404')
    }
    if(soundslip.user._id != request.user.id && soundslip.status == 'private'){
      response.render('error/404')
    } else{
      response.render('soundslips/show', {
        soundslip,
      })
    }
  } catch(err){
    console.error(err)
    response.render('error/404')
  }
})

// @desc  Show edit page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (request, response) => {
  try{
    const soundslip = await Soundslip.findOne({
      _id: request.params.id
    }).lean()

    if(!soundslip){
      return response.render('error/404')
    }
    if(soundslip.user != request.user.id){
      response.redirect('/soundslips')
    } else{
      response.render('soundslips/edit', {
        soundslip,
      })
    }
  } catch(err){
    console.error(err)
    return response.render('error/500')
  }

})

// @desc  Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, async (request, response) => {
  try{
    let soundslip = await Soundslip.findById(request.params.id).lean()

    if(!soundslip) {
      return response.render('error/404')
    }
    if(soundslip.user != request.user.id){
      response.redirect('/soundslips')
    } else{
      soundslip = await Soundslip.findOneAndUpdate({_id: request.params.id}, request.body, {
        new: true,
        runValidators: true,
      })

      response.redirect('/dashboard')
    }
  } catch(err){
    console.error(err)
    return response.render('error/500')
  }
})

// @desc  Delete story
// @route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (request, response) => {
  try{
    await Soundslip.remove({_id: request.params.id})
    response.redirect('/dashboard')
  } catch(err){
    console.error(err)
    return response.render('error/500')
  }
})

// @desc  User stories
// @route GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (request, response) => {
  try{
    const soundslips = await Soundslip.find({
      user: request.params.userId,
      status: 'public'
    })
    .populate('user')
    .lean()
    response.render('soundslip/index', {
      soundslips
    })
  } catch(err){
    console.error(err)
    response.render('error/500')
  }
})

module.exports = router
