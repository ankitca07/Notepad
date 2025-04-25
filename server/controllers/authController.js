const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        // role: user.role // Include role if implementing RBAC
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
     console.error("Signup Error:", error);
     res.status(500).json({ message: 'Server Error during signup' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        // role: user.role // Include role if implementing RBAC
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
     console.error("Login Error:", error);
     res.status(500).json({ message: 'Server Error during login' });
  }
};

// @desc    Get user profile (Example protected route)
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // req.user is set by the protect middleware
  const user = await User.findById(req.user._id).select('-password'); // Ensure password isn't sent
   if (user) {
       res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // role: user.role
       });
   } else {
       res.status(404).json({ message: 'User not found' });
   }
};


module.exports = { signupUser, loginUser, getUserProfile };