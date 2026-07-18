import express from "express";
import { signup, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Forgot-Password
router.post("/forgot-password", forgotPassword);

// Reset-Password
router.post("/reset-password", resetPassword);

export default router;