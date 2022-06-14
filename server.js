// Stopped at setting up mongodb atlas account section

// https://zellwk.com/blog/crud-express-mongodb/

const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/samples', (req, res) => {
  console.log(req.body)
})

MongoClient.connect('mongodb-connection-string', (err, client) => {

})
