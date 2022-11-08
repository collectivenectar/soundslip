# soundslip

A Webapp for sharing small audio files

It's currently DEPLOYED and live at:


https://soundslip-frontend.herokuapp.com

mobile and desktop demo:

<img src="https://github.com/collectivenectar/soundslip/blob/main/soundslip-desktop.gif" width="500">
<img src="https://github.com/collectivenectar/soundslip/blob/main/soundslip-mobile.gif" width="300">

If you would like to contribute or offer suggestions for improvement you are welcome to contact me or open an issue!



Soundslip is a sharing app for audio files

I love sites like freesound.org and picking up sample packs and instruments for my own music production,
so I decided to make a sound sharing app, starting with a basic server, then eventually shooting for an IPFS pinned version.

# MVP features:

1) Each user has the option to upload audio files as 'public' or 'private' - to share or keep access restricted.
2) Search for public audio files by file Title as well as any previously created Username.
3) Add sample 'tags' that identify the file as a certain type of sample - "loop", "synth", "drums", "voice", "solo", "other"

# Considered additional features:

1) larger file sizes (full songs or wav/aiff/flac) with GridFS, more MIME types
2) group audio files as packs or albums - i.e. add a custom 'album' tag to filter results with.
3) Decentralized file hosting, i.e. pinned on IPFS
4) Cryptocurrency integration for file access paygates / NFT authentication and DID auth

# Concerns:

As this is an app for sharing music, there would long-term have to be some liability regarding creative ownership and copyright 
compliance. My solution would be to shoot for CC0 licensing for anything public, and if the service is relied on that heavily
I can always integrate a copyright checking service, or just find a way to fully decentralize the entire service if possible.

Some sample screenshots:

<img src="https://github.com/collectivenectar/soundslip/blob/main/mobilesearch.png?raw=true" width="460" height="840">
<img src="https://github.com/collectivenectar/soundslip/blob/main/usermanage.png?raw=true" width="683" height="384">
<img src="https://github.com/collectivenectar/soundslip/blob/main/upload.png?raw=true" width="683" height="384">
<img src="https://github.com/collectivenectar/soundslip/blob/main/sampletags.png?raw=true" width="683" height="124">

A video demo showing how it works:

[coming soon]

# Make it yourself with:

## Client

VITE
REACT
REACT-DOM
REACT-ROUTER-DOM
CLERK.DEV 

## Server

MULTER
MULTER-S3-V2
EXPRESS
MONGODB
MONGOOSE
AWS-SDK(V2)
CORS


## AWS Notes:

To use with AWS, acquire an AWS IAM user with access to AWS.S3 bucket.

If your file host service provides presigned URLs, I've tried to make it simple to swap out.


Otherwise, if you don't want to use presigned URLs or AWS you may need to change
how the audio player handles either the files or urls, and how they are routed. 

That is all handled in: 

https://github.com/collectivenectar/soundslip/blob/main/client/src/App.jsx
https://github.com/collectivenectar/soundslip/blob/main/server/middleware/multer.js
https://github.com/collectivenectar/soundslip/blob/main/server/controllers/awsController.js



## To deploy just the vite client on heroku, I have used:

Procfile 
web: npm run heroku-push 


Buildpack
heroku/nodejs 


package.json
"scripts": {
    "heroku-push": "vite --host --port $PORT"
  }, 
  
  

## And in the heroku CLI to build the client the first time I changed some settings: 


NPM_CONFIG_PRODUCTION=false

NPM_CONFIG_LOGLEVEL=error

YARN_PRODUCTION=false

NODE_VERBOSE=false

NODE_ENV=production

NODE_MODULES_CACHE=true





## To deploy just the express server on heroku, I used:

Buildpack
heroku/nodejs

Even without a procfile heroku deploys the server build without issue, no changes to the package.json


