const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const cors = require('cors')

// load config
dotenv.config({path: './config/config.env'})

// connect to mongodb
connectDB()
  .then(() => {
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
  })

const app = express()

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// Set global var
// app.use(function(request, response, next){
//   response.locals.user = request.user || null
//   next()
// })

// Routes

app.use('/', require('./routes/index'))
app.use('/soundslips', require('./routes/soundslips'))


// PORT
const PORT = process.env.PORT || 3000

// Set up express to listen
