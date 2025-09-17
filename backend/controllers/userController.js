import Task from '../models/Task.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// @desc    Get all users(admin only)
// @route   GET /api/users
// @access  Private/Admin

const getUsers = async (req, res) => {
  try {
    const users = await User.find({role:"member"}).select('-password');
    
    //Add task count to each user
    const usersWithTaskCount = await Promise.all(users.map(async (user) => {
      const pendingTasks=await Task.countDocuments({assignedTo:user._id,status:"Pending"});

      const completedTasks=await Task.countDocuments({assignedTo:user._id,status:"Completed"});
      const inProgressTasks=await Task.countDocuments({assignedTo:user._id,status:"In-progress"});
      return {
        ...user._doc,//Including all existing user fields
        pendingTasks,
        completedTasks,
        inProgressTasks,
      };

    }));

    res.json(usersWithTaskCount);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' ,error: error.message});
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
      
    };
    res.json(user);
}catch (error) {
  res.status(500).json({ message: 'Server error' ,error: error.message});
}
};





export { getUsers, getUserById};



