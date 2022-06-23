# soundslip
A Webapp for sharing small audio files

Soundslip is a sharing app for audio files

I love sites like freesound.org and picking up sample packs and instruments for my own music production,
so I decided to make a sound sharing app, starting with a basic server, then going for an IPFS pinned version.

The plan is to eventually shift to a service like pinata for file hosting, and see how I can improve serving from there.


MVP features:

1) Create a sharable public user profile and a shareable profile link, and an account.
2) Upload small audio files and get a shareable link to that file in your user profile.
3) Save links to other audio files and profiles in your account.

Considered additional features:

1) larger file sizes (full songs or wav/aiff/flac) with GridFS
2) group audio files as packs or albums
3) Sample history page -> See if other users have used this sample in any of their songs/samples, with links
4) Decentralized hosting for all aspects of the app, including user authentication, i.e. Running a node or using metamask.
5) Cryptocurrency integration for file access paygates.
6) Virtual folders for DAW integration(search for files hosted from inside DAW?)

Concerns:

As this is an app for sharing music, there will be some liability regarding creative ownership and copyright 
compliance. It will do better if it's completely decentralized, but there will still be some t's and c's to 
cover DMCA.

These are some figma wireframes I made to sketch out the structure of the app(subject to lots of change possibly)



<img src="https://github.com/collectivenectar/soundslip/blob/main/WireframeSearch.jpg?raw=true" width="683" height="384">
<img src="https://github.com/collectivenectar/soundslip/blob/main/WireFrameAccount.jpg?raw=true" width="150" height="100">
<img src="https://github.com/collectivenectar/soundslip/blob/main/WireframeAccountInfo.jpg?raw=true" width="683" height="384">
<img src="https://github.com/collectivenectar/soundslip/blob/main/WireframeUploadS1.jpg?raw=true" width="683" height="384">
<img src="https://github.com/collectivenectar/soundslip/blob/main/WireframeUploadS2.jpg?raw=true" width="683" height="384">


