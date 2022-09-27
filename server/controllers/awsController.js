const aws = require('aws-sdk');
const Soundslip = require('../models/Soundslip')
const {upload} = require('../middleware/multer')

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: "eu-west-3"
  });

const singleUpload = upload.single("file")


// All CRUD operations for the AWS audio files. Create, Delete, and Read, no update/put.
module.exports = {
    // ADD a soundslip to the db
    // CAN PASS MULTIPLE FILES PASSING AN ARRAY OF OBJECTS for batching later?
    actionCreateSoundslip: async (request, response) => {
        try{
            singleUpload(request, response, function(err){
                if(err) {
                    response.status(500).send({mssg: `error uploading to s3: ${err.message}`})
                }
                // STORE THE KEY VALUE? OR THE URL?
                let soundslipLocation = {fileKey: request.file.key}
                request.body.fileKey = soundslipLocation.fileKey
                Soundslip.create(request.body)
                    .then(() => {
                        response.status(200).send({mssg: "upload successful"})
                    })
            })
        }catch(err){
            console.error(err)
            response.status(500).json({mssg: "unable to create"})
        }
    },
    // CHANGING DB - DELETING soundslip permanently, on success db is changed.
    actionDeleteSoundslip: async (request, response) => {
        try{
            const soundslip = await Soundslip.findById({_id: request.params.id})
            if(!soundslip){
                response.status(404).send({mssg: "unable to find soundslip by that ID"})
            }else{
                // add if logic here to check the user ID matches request user ID.
        
                var params = {
                    Bucket: "soundslip", 
                    Key: soundslip.fileKey
                };
                s3.deleteObject(params, function(err, data) {
                    if (err){
                        console.log(err, err.stack); // an error occurred
                    } else{
                        console.log(data);           // successful response
                        Soundslip.deleteOne({_id: request.params.id})
                            .then(response.status(200).send({mssg: "successfully deleted soundslip"}))
                            .catch(err => {
                                console.error(err)
                            })
                    }
                })
            }
        } catch(err){
            console.error(err)
            response.status(500).json({mssg: "error"})
        }
    },
    getSoundslipById: async (request, response) => {
        try {
            const soundslip = await Soundslip.findById(request.params.id)
                .populate('userId')
                .lean()
            if (!soundslip) {
                response.status(404).json({ mssg: "not found" })
            }
            else if (soundslip.userId != request.query.id && soundslip.status == 'private') {
                response.status(404).json({ mssg: "unable to access" })
            } 
            // request a copy of the object in AWS
            // returns AWS.Request
            var s3Params = {
                Bucket: "soundslip",
                Key: soundslip.fileKey,
                Expires: 300, 
                ResponseContentType: 'audio/mpeg'
            };
            const url = await s3.getSignedUrl('getObject', s3Params)
                    // successful response
                    /*
                    data = {
                    AcceptRanges: "bytes", 
                    ContentLength: 3191, 
                    ContentType: "image/jpeg", 
                    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
                    LastModified: <Date Representation>, 
                    Metadata: {
                    }, 
                    TagCount: 2, 
                    VersionId: "null"
                    }
                    */
            console.log(url)
            response.status(200).send(url)
        } catch (err) {
            console.error(err)
            response.status(500).send({ mssg: "error" })
        }
    },
    // For requesting a presign URL for the audio player
    getPreSignedAudio: async (operation, params, callback) => {
        try{
            var params = {
                Bucket: 'bucket', 
                Key: 'key'
            };
            var url = s3.getSignedUrl('getObject', params);
            // etc etc, download or stream the file to the client?
            console.log('The URL is', url);
        }catch(err){
            console.log(err)
        }
    }
}