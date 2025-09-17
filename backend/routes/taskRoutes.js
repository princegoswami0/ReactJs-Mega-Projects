import express from 'express';
import { protect, adminOnly} from '../middlewares/authMiddleware.js';
import { get } from 'mongoose';
import { createTask, deleteTask, getDashboardData, getTaskById, getTasks, getUserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from '../controllers/taskController.js';

const router = express.Router();

// task management routes

router.get('/dashboard-data', protect, getDashboardData); // Example route for dashboard data
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/",protect,getTasks);// Get all task (Admin: all , User ; assigned)
router.get("/:id",protect,getTaskById);//Get task by ID
router.post("/",protect,adminOnly,createTask);//Create new task (Admin only)
router.put("/:id",protect,updateTask);//UPdate task details
router.delete("/:id",protect,adminOnly,deleteTask);//Delete task (Admin only)
router.put("/:id/status",protect,updateTaskStatus);//UPdate Task status
router.put("/:id/todo",protect,updateTaskChecklist);//UPdate Task checklist

export default router;