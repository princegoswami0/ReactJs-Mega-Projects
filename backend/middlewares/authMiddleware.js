import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// This middleware checks if the user is logged in (for protected routes)
const protect = async (req, res, next) => {
  try {
    let token;

    // Token should come in the header in "Bearer <token>" format
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]; // Extract the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = await User.findById(decoded.id).select('-password'); // Get user data without password
      next(); // All good, move to next middleware or route
    } else {
      res.status(401).json({ message: 'Hey! No token found, please login first' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Oops! Token failed, try again', error: error.message });
  }
};

// This middleware ensures only admin users can access the route
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Admin found, allow access
  } else {
    res.status(403).json({ message: 'Oops! Only admins can access this' });
  }
};

export { protect, adminOnly };
