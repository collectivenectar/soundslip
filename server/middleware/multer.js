const multer = require('multer')
const multerS3 = require('multer-s3-v2')

// Multer opens up the option of multiple samples being uploaded at the same time
// which would be great for sample packs and the like. But, s3 is likely to be
// phased out for the next round, so it will all be likely gone.

const aws = require('aws-sdk')
const s3 = new aws.S3()

const mimetypes = ["audio/mpeg"] // + , "audio/vnd.wav", "audio/x-aiff"

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "eu-west-3"
})

const fileFilter = (req, file, cb) => {
  if(mimetypes.includes(file.mimetype)){
    cb(null, true);
  }else{
    cb(new Error("Invalid file type, only MP3"))
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "soundslip",
    metadata: function (request, file, cb) {
      cb(null, {contentType: "audio/mpeg"})
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(request, file, cb) {
      cb(null, Date.now().toString());
    }
  })
})

module.exports = { upload }