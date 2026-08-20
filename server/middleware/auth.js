const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'coursedivine_super_secret_jwt_key_2026_production');

      // Fetch user from DB or mock if in mock mode
      let user = null;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Fallback user object from token
        user = {
          _id: decoded.id,
          name: decoded.name || 'Course Divine Student',
          email: decoded.email || 'student@coursedivine.com',
          role: decoded.role || 'user'
        };
      }

      if (!user) {
        // fallback in case token is decoded
        user = {
          _id: decoded.id,
          name: decoded.name || 'User',
          email: decoded.email || '',
          role: decoded.role || 'user'
        };
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token verification failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

module.exports = { protect };
