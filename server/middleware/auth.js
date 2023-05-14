const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// send data to authentic username
const authenticate = (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // Verify token and extract user info
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
module.exports = {
    authenticate
  };
 
  
  
  
  
  
  
  