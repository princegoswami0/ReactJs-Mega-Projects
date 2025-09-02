import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

//Auth Routes 

router.post('/register', registerUser); // User registration
router.post('/login', loginUser); // User login
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

export default router;



