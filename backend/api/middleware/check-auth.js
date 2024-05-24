const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Authorization');
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    jwt.verify(token, 'secret');
    decodedToken = jwt.verify(token, 'secret');
    res.userData = decodedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
}