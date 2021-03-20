const router = require('express').Router();
const User = require('../models/userModel');

router.post('/', (req, res) => {
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
    const existingUser = User.findOne({ email });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
