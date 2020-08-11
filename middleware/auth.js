const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header('x-auth-token');
  if (!token) {
    res.send(401).json({ msg: 'No token, Authorisation denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('secretKey'));
    req.user = decoded.user;
    next();
  } catch (e) {
    res.send(400).json({ msg: 'Invalid token' });
  }
};
