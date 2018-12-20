const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

  try {
    const decoded = await jwt.verify(token, config.get('jwtPrivateKey'));
    req.userInfo = decoded;
    return next();
  } catch (exception) {
    return res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};
