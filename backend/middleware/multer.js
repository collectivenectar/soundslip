const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');

const s3 = new aws.S3();

const mimetypes = ["audio/mpeg"] // + , "audio/vnd.wav", "audio/x-aiff"

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "eu-west-3"
});

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
      cb(null, {content-type: "audio/mpeg"})
    },
    key: function(request, file, cb) {
      cb(null, Date.now().toString());
    }
  })
})

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './tempStorage')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '--' + file.originalname)
//   }
// })

module.exports = { upload }