const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// connect to mongodb
connectDB().then(() => {
  app.listen(PORT, console.log(`Server running on port ${PORT}`));
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://soundslip.netlify.app")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser());

// Routes

app.use('/', require('./routes/index'));
app.use('/soundslips', require('./routes/soundslips'));
