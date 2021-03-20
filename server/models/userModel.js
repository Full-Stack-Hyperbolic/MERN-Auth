const mongoose = require('mongoose');

// Create a user Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passHash: { type: String, required: true },
});

// Create a User model from the schema
const User = mongoose.model('user', userSchema);

// Export the User model
module.exports = User;
