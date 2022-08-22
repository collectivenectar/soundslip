const Soundslip = require('../models/Soundslip')


// Main index route functions
// get all users soundslips, public and private
const getDashboard = async (request, response) => {
  console.log(request)
  try{
    const soundslips = await Soundslip.find({userId: request.body.id})
      .lean()
    response.status(200).send(soundslips)
  }catch (err){
    console.error(err)
    response.status(500).send({mssg: "no soundslips found for that user"})
  }
}

// get all soundslips with 'public' status
const getPubSoundslips = async (request, response) => {
    try{
      const soundslips = await Soundslip.find({ public: true })
        // .populate('user')
        .sort({createdAt: 'desc'})
        .lean()
      response.status(200).send(soundslips)
    }catch (err){
      console.error(err)
      response.status(500).json({mssg: "no soundslips found", error: err})
    }
  }

// Main CRUD Soundslip related functions

// ADD a soundslip to the db
// CAN PASS MULTIPLE FILES PASSING AN ARRAY OF OBJECTS for batching later?
const actionCreateSoundslip = async (request, response) => {
  try{
    // request.body.user = request.user.id
    // For example, instead of '(request.body)' below, you could instead
    // put '([request.body.track1, request.body.track2, ...])' and publish
    // multiple files at once.
    await Soundslip.create(request.body)
      .then(() => {
        response.status(200).send({mssg: "redirect to dashboard after adding"})
      })
  }catch(err){
    console.error(err)
    response.status(500).json({mssg: "unable to create"})
  }
}

// Find ONE soundslip, if private and belongs to same user, or if public.
const getSoundslipById = async (request, response) => {
  try{
    let soundslip = await Soundslip.findById(request.params.id)
      .populate('user')
      .lean()
    if(!soundslip){
      response.status(404).json({mssg: "not found"})
    }
    if(soundslip.user._id != request.user.id && soundslip.status == 'private'){
      response.status(404).json({mssg: "unable to access"})
    } else{
      response.status(200).json(soundslip)
    }
  } catch(err){
    console.error(err)
    response.status(500).json({mssg: "error"})
  }
}

// Request to edit soundslip, if successful, redirect to edit form
const editSoundslipForm = async (request, response) => {
  try{
    const soundslip = await Soundslip.findOne({
      _id: request.params.id
    }).lean()

    if(!soundslip){
      response.status(404).json({mssg: "unable to edit, soundslip id not recognized"})
    }
    if(soundslip.user != request.user.id){
      response.status(404).json({mssg: "not yours to edit"})
    } else{
      response.status(200).json(soundslip)
    }
  } catch(err){
    console.error(err)
    return response.status(500).json({mssg: "error"})
  }
}

// CHANGING DB - confirming edit of the soundslip, on success db is changed.
const actionEditSoundslip = async (request, response) => {
  try{
    let soundslip = await Soundslip.findById(request.params.id).lean()
    if(!soundslip) {
      response.status(404).json({mssg: "not found"})
    }
    if(soundslip.user != request.user.id){
      response.status(404).json({mssg: "not yours to edit"})
    } else{
      soundslip = await Soundslip.findOneAndUpdate({_id: request.params.id}, request.body, {
        new: true,
        runValidators: true,
      })

      response.status(200).json({mssg: "should redirect to dashboard from here"})
    }
  } catch(err){
    console.error(err)
    response.status(500).json({mssg: "error"})
  }
}

// CHANGING DB - DELETING soundslip permanently, on success db is changed.
const actionDeleteSoundslip = async (request, response) => {
  try{
    await Soundslip.remove({_id: request.params.id})
    response.status(200).json({mssg: "request to delete accepted"})
  } catch(err){
    console.error(err)
    response.status(500).json({mssg: "error"})
  }
}

// Find all public status soundslips for a specific user.
const getPubSoundslipsByUser = async (request, response) => {
  try{
    const soundslips = await Soundslip.find({
      user: request.params.username,
      public: true
    })
    .populate('username')
    .lean()
    response.status(200).json({mssg: "all users pub soundslips"})
  } catch(err){
    console.error(err)
    response.status(500).json({mssg: "error searching user pub sslips"})
  }
}


module.exports = {
  getDashboard,
  getPubSoundslips,
  // getPublicSoundslips,
  getSoundslipById,
  getPubSoundslipsByUser,
  editSoundslipForm,
  actionCreateSoundslip,
  // actionEditSoundslip,
  // actionDeleteSoundslip
}
