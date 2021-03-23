const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    // Destructure the incoming request data
    const { email, password, password2 } = req.body;

    // 1. INPUT VALIDATION
    // Ensure all fields are filled out
    if (!email || !password || !password2)
      // return error 400 and error message which can be returned to the front-end
      return res
        .status(400)
        .json({ errorMessage: 'Please fill out the required fields.' });
    // Ensure password meets length requirement
    if (password.length < 6) {
      return res.status(400).json({
        errorMessage:
          'Please ensure your password contains at least 6 characters.',
      });
    }
    // Ensure passwords match
    if (password !== password2) {
      return res
        .status(400)
        .json({ errorMessage: 'Please ensure your passwords match.' });
    }
    // Check to see if the email address entered already exists
    const existingUser = await User.findOne({ email });

    // If there IS a user with a matching email...
    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: 'User with this email already exists.' });
    }

    // Otherwise - create a new user with the email and password
    // Hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Save new user account to the db with hashed password

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // Log the user in

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in a HTTP-only cookie
    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .send();

    console.log(token);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
