import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate the Jwt Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc new user registeration
// @route POST /api/auth/register
// @access Public


const registerUser = async (req, res) => {
  try {
    const {name, email , password , profileImageUrl,adminInviteToken} = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Determine user role based on adminInviteToken otherwise 'member'
    let role = 'member';
    if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = 'admin';
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImgUrl: profileImageUrl,
      role,
    });

    // If user creation is successful, return user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImgUrl: user.profileImgUrl,
      role: user.role,
      token: generateToken(user._id),
    });




  }catch (error) {
    res.status(500).json({ message: 'Server error, please try again', error: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private(Requires authentication)

const getUserProfile = async (req, res) => {};

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private(Requires authentication)

const updateUserProfile = async (req, res) => {};

export { registerUser, loginUser, getUserProfile, updateUserProfile };

