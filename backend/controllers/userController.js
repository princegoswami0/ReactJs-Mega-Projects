import task from '../models/Task';
import user from '../models/User';
import bcrypt from 'bcryptjs';

// @desc    Get all users(admin only)
// @route   GET /api/users
// @access  Private/Admin

const getUsers = async (req, res) => {
  try {
    
}catch (error) {
  res.status(500).json({ message: 'Server error' ,error: error.message});
}
};


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
}catch (error) {
  res.status(500).json({ message: 'Server error' ,error: error.message});
}
};

// @desc    Delete user by ID (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = async (req, res) => {
  try {

  }catch (error) {
    res.status(500).json({ message: 'Server error' ,error: error.message});
  }
};

export { getUsers, getUserById, deleteUser };



