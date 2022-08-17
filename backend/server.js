const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')
const cors = require('cors')

// load config
dotenv.config({path: './config/config.env'})

// passport config
require('./config/passport')(passport)

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

// sessions
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
// }))

// Passport Middleware
// app.use(passport.initialize())
// app.use(passport.session())

// Set global var
// app.use(function(request, response, next){
//   response.locals.user = request.user || null
//   next()
// })

// Routes

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/soundslips', require('./routes/soundslips'))


// PORT
const PORT = process.env.PORT || 3000

// Set up express to listen
