const express = require('express');
const mongoose = require('mongoose');

// dotenv for environment vars
require('dotenv').config();

// Create express app
const app = express();

// define ports for dev and deployment (heroku)
const PORT = process.env.PORT || 5000;
// Establish server listener on dev and deployment ports
app.listen(PORT, () =>
  console.log(`Successfully started server on port ${PORT}`)
);

// Connect to Atlas MongoDB
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) return console.log(err);
    console.log('Successfully connected to MongoDB!');
  }
);

// Make app 'use' the middleware 'express.json' for any incoming request to parse json body
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('It works');
});

// Establish Routes
app.use('/auth', require('./routers/userRouter'));
