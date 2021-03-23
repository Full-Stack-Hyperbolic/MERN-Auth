/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    // If not authorized...
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    // Compare the token with the server JWT password
    //      - if the token has NOT been created with this password - it will throw an error (catch)
    //      - otherwise, it will decode it and place the (object) payload with 'user' field and 'id' into the assigned variable (verifiedToken)
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Once we have an authorized user - set it to a newly created 'user' property of req
    req.user = verifiedToken.user;

    // Exit from auth middleware and continue to next function
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      errorMessage: 'Unauthorized',
    });
  }
}

module.exports = auth;
