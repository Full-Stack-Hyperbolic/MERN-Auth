const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

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

// Parse the JSON bodies of incoming reqs into a req.body
app.use(express.json());
app.use(cookieParser());

app.get('/', (res, req) => {
  console.log('Working');
});

// Establish Routes
app.use('/auth', require('./routers/userRouter'));
app.use('/customer', require('./routers/customerRouter'));
