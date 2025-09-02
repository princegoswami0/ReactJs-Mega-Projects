import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();

// Connect to database
connectDB();

//Middlewares to handle CORS issues

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Middlewares configuration

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/report", reportRoutes);


//server start

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
