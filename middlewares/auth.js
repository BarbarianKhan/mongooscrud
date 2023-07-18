const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied, missing token' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify and decode the token
    req.userId = decoded.userId; // Attach the decoded user ID to the request
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;