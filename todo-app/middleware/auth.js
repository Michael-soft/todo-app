const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.session.token;
// sourcery skip: use-braces
    if (!token) return res.redirect('/login');

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.redirect('/login');
  }
};

module.exports = authenticate;