const Soundslip = require('../models/Soundslip')
const mongoose = require('mongoose')

// All mongoDB related queries for metadata, not for file storage.

module.exports = {
  // LIBRARY - SEARCH - pass in search params like audio tags/username/title
  getPubSoundslips: async (request, response) => {
    try{
      // Base search with no parameters returns all items in the db - Not good
      // if not paginated and the db gets big, but won't be a problem at this point.
      // Below line is that base search object passed into the mongoose search.
      let search = {
        "$and":[
          {
            public: true
          },
        ]
      }
      // If there are filters, add the filters.
      if(request.query.filters && request.query.filters.length > 0){
        if(request.query.filters.includes(",")){
          let filtersArray = []
          let requestFilters = request.query.filters.split(",")
          for(let eachFilter = 0; eachFilter < requestFilters.length; eachFilter++){
            filtersArray.push({"tag": `${requestFilters[eachFilter]}`})
          }
          search["$or"] = filtersArray
        }else{
          search["$and"].push({"tag": request.query.filters})
        }
      }
      // If there is no queryType, do nothing. - This line and other code related to queryType needs
      // a check since there's only Title and Username so far.
      if(!request.query.queryType){

      }
      // Otherwise add the mongoose model key and search string, 'userName' or 'title'
      else if(request.query.queryType === "Username"){
        search["$and"].push({userName: {'$regex': String(request.query.query), $options: "i"}})
      }else if(request.query.queryType === "Title"){
        let titleSearch = request.query.query.trim()
        if(titleSearch.split(" ").length > 1){
          for(let eachWord = 0; eachWord < titleSearch.split(" ").length; eachWord++){
            search["$and"].push({"title": {'$regex': String(titleSearch[eachWord]), $options: "i"}})
          }
        }else{
          // if a "" passed in it could make it here - fix with logic: 
          if(titleSearch !== ""){
            search["$and"].push({"title": {'$regex': String(titleSearch), $options: "i"}})
          }
        }
      }
      const soundslips = await Soundslip.find(search)
        // .populate('user')
//--->> This section needs tweaking for pagination
        .sort({createdAt: 'desc'})
        .lean()
        console.log(soundslips)
      response.status(200).send(soundslips)
    }catch (err){
      console.error(err)
      response.status(500).send({mssg: "no soundslips found", error: err})
    }
  },
  // PRIVATE PROFILE - GET ALL - returns all user audio samples, public and private
  getDashboard: async (request, response) => {
    try{
      
      const soundslips = await Soundslip.find({userId: request.body.id})
        .lean()
// -----> needs logic check for auth - if client/server separated
console.log(response)
      response.status(200).send(soundslips)
    }catch (err){
      response.status(500).send({mssg: "no soundslips found for that user"})
    }
  },
  // PUBLIC PROFILE - GET ALL Find all public status soundslips for a specific user. i.e. 
  // public profile page. Just keeping this function separate from the getDashboard function
  // to protect auth access.
  getPubSoundslipsByUser: async (request, response) => {
    try{
      const soundslips = await Soundslip.find({
        userName: request.params.username,
        public: true
      })
        .populate('username')
        .lean()
        console.log(response)
      response.status(200).send(soundslips)
    }catch(err){
      console.error(err)
      response.status(500).json({mssg: "error searching user pub slips"})
    }
  },
  // PROFILE - EDIT SAMPLE DETAILS - confirming edit of the soundslip, on success mongodb is changed.
  actionEditSoundslip: async (request, response) => {
    try{
      const soundslip = await Soundslip.findById({_id: request.body._id})
      console.log(response)
      if(!soundslip) {
        response.status(404).send({mssg: "not found"})
      }
      else if(soundslip.userId !== request.body.userId){
        response.status(404).send({mssg: "not yours to edit"})
      }
      else{
        await Soundslip.findOneAndUpdate({_id: soundslip._id}, {
          body: request.body.body,
          public: request.body.public,
          title: request.body.title
        }, {
          new: true,
          runValidators: true,
        })
        response.status(200).send({mssg: "edit successful"})
      }
    } catch(err){
      console.error(err)
      response.status(500).send({mssg: "error updating soundslip"})
    }
  },
}