const validator = require('validator');

// Sanitize input
exports.sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = validator.escape(req.body[key].trim());
      }
    });
  }
  next();
};

// Validate email
exports.validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email && !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  
  next();
};

// Validate password strength
exports.validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password && password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  
  next();
};
