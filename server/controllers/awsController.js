const Soundslip = require('../models/Soundslip')
const aws = require('aws-sdk')
const {upload} = require('../middleware/multer')

// TODO: This needs to be seriously updated within 2 weeks, trying out render, maybe cloudinary.
// bucket storage likely needs to be switched to something like infura

const s3 = new aws.S3()

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "eu-west-3"
  })

const singleUpload = upload.single("file")


// AWS - operations for AWS S3 Bucket audio files. Create, Delete, and Read, no update/put.
module.exports = {
    // UPLOAD - ADD a soundslip to the db
    actionCreateSoundslip: async (request, response) => {
        try{
            singleUpload(request, response, function(err){
                if(err) {
                    response.status(500).send({mssg: `error uploading to s3: ${err.message}`})
                }
                let soundslipLocation = {fileKey: request.file.key}
                request.body.fileKey = soundslipLocation.fileKey
                Soundslip.create(request.body)
                    .then(() => {
                        response.status(200).send({mssg: "upload successful"})
                    })
            })
        }catch(err){
            console.error(err)
            response.status(500).send({mssg: "unable to create"})
        }
    },
    // PRIVATE PROFILE - DELETING soundslip permanently, on success db is changed.
    actionDeleteSoundslip: async (request, response) => {
        try{
            const soundslip = await Soundslip.findById({_id: request.params.id})
            if(!soundslip){
                response.status(404).send({mssg: "unable to find soundslip by that ID"})
            }else{
                // add if logic here to check the user ID matches request user ID.
                if(soundslip.userId === request.query.userId){
                    var params = {
                        Bucket: "soundslip", 
                        Key: soundslip.fileKey
                    };
                    s3.deleteObject(params, function(err, data) {
                        if (err){
                            console.log(err, err.stack) // an error occurred
                        } else{
                            Soundslip.deleteOne({_id: request.params.id})
                                .then(response.status(200).send({mssg: "successfully deleted soundslip"}))
                                .catch(err => {
                                    console.error(err)
                                })
                        }
                    })
                }else{
                    response.status(500).send({mssg: "not your soundslip to delete"})
                }
            }
        } catch(err){
            console.error(err)
            response.status(500).send({mssg: "error"})
        }
    },
    // LIBRARY && PUBLIC PROFILE && PRIVATE PROFILE - User requested to play a sample - presigned URL
    // specifically for playback. Must be authorized to access file.
    getSoundslipById: async (request, response) => {
        try {
            const soundslip = await Soundslip.findById(request.params.id)
                .populate('userId')
                .lean()
            if (!soundslip) {
                response.status(404).send({ mssg: "not found" })
            }
            else if (soundslip.userId != request.query.id && soundslip.status == 'private') {
                response.status(404).send({ mssg: "unable to access" })
            }
            // request a copy of the object in AWS
            // returns AWS.Request
            var s3Params = {
                Bucket: "soundslip",
                Key: soundslip.fileKey,
                Expires: 300, 
                ResponseContentType: 'audio/mpeg'
            }
            const url = await s3.getSignedUrl('getObject', s3Params)
            response.status(200).send(url)
        } catch (err) {
            console.error(err)
            response.status(500).send({ mssg: "error" })
        }
    },
    // LIBRARY && PRIVATE PROFILE && PUBLIC PROFILE - User requested a download - i.e. if
    // private file and user is not owner, access denied.
    getDownload: async (request, response) => {
        try{
            const soundslip = await Soundslip.findById(request.params.slipId)
                .populate('userId')
                .lean()
            if (!soundslip) {
                response.status(404).send({ mssg: "not found" })
            }
            else if (soundslip.userId != request.body.userId && soundslip.status == 'private') {
                response.status(404).send({ mssg: "unable to access" })
            }   
            else{
                var s3Params = {
                    Bucket: "soundslip",
                    Key: soundslip.fileKey,
                    Expires: 300, 
                    ResponseContentType: 'audio/mpeg',
                    ResponseContentDisposition: 'attachment'
                };
                var url = await s3.getSignedUrl('getObject', s3Params);
                response.send(url)
            }
        }catch(err){
            console.log(err)
            response.send({mssg: `error occurred requesting a download url`})
        }
    }
}