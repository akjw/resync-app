const jwt = require('jsonwebtoken');

//Authorize user via jwt
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token){
    return res.status(401).json({
      message: 'You are not authorized for this action',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}