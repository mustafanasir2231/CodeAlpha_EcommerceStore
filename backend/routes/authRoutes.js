import express from 'express';
// Import authentication controller functions, including forgotPassword
import { registerUser, loginUser, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Authenticate and log in a user
router.post('/login', loginUser);

// Handle forgot password requests
router.post('/forgot-password', forgotPassword);

export default router;