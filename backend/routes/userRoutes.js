import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { deleteUser, getUserById, getUsers } from "../controllers/userController.js";



const router = express.Router();

// User Management Routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, adminOnly,deleteUser);

export default router;
