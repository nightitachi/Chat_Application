import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Define auth routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;
