const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

const app = express()

// connect to mongodb
connectDB()
  .then(() => {
    app.listen(PORT, console.log(`Server running on port ${PORT}`))
  })

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(bodyParser())

// Routes

app.use('/', require('./routes/index'))
app.use('/soundslips', require('./routes/soundslips'))
